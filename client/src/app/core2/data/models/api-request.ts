import { HttpRequest, HttpResponse } from "@angular/common/http"

export class APIRequest {

    // https://www.concretepage.com/angular/angular-caching-http-interceptor
    
    url: string
    response: HttpResponse<any>
    timeResponseReceived: number
}
