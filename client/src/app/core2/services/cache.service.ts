import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIRequest } from '../data/models/api-request';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  // https://www.concretepage.com/angular/angular-caching-http-interceptor

  constructor() { }

  private cached = new Map<string, APIRequest>()
  private lifeTime: 300000 // 5 min

  get(requestedURL: string): APIRequest | null {
    let reqFound = this.cached.get(requestedURL)
    return reqFound ? reqFound : null
  }

  cacheRequest(request: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cached.set(request.urlWithParams, {url: request.urlWithParams, response: response, timeResponseReceived: Date.now()})
    this.removeExpired()
  }

  removeRequest(url: string): boolean {
    return this.cached.delete(url)
  }
  
  isExpired(cache: APIRequest): boolean {
    return (Date.now() - cache.timeResponseReceived) > this.lifeTime
  }

  removeExpired(): void {
    this.cached.forEach(cachedResource => {
      if(this.isExpired(cachedResource)){
        this.removeRequest(cachedResource.url)
      }
    })
  }
}
