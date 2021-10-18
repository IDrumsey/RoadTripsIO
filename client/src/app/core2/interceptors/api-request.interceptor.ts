import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  // https://www.concretepage.com/angular/angular-caching-http-interceptor

  API_PREFIX = "http://localhost:3000/"

  constructor(private cacheManager: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let requestedURL = request.urlWithParams

    // if not cacheable
    let cachedResource = this.cacheManager.get(requestedURL)
    if(!this.canCache(request)){
      return next.handle(request)
    }

    // if in cache and not expired, use cache
    if(cachedResource && !this.cacheManager.isExpired(cachedResource)){
      return of(cachedResource.response)
    }
    else{
      // send request and listen for response
      return next.handle(request).pipe(
        tap(event => {
          if(event instanceof HttpResponse){
            this.cacheManager.cacheRequest(request, event)
          }
        })
      )
    }
  }

  canCache(request: HttpRequest<any>): boolean {
    return (request.url.indexOf(this.API_PREFIX) != -1 && request.method == "GET")
  }
}
