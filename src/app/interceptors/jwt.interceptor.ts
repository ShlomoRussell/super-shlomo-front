import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let _request;
    const jwtStorage = window.localStorage.getItem(environment.jwtLocalStorageKey);
    if (jwtStorage) {
      _request = request.clone({
        setHeaders: {
          'Authorization': 'bearer ' + jwtStorage
        }
      })
    }
    return next.handle(_request || request);
  }
}
