import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.storageService.getAccessToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (user && user?.accessToken) {
      request = request.clone({
        url: environment.apiUrl + request.url,
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    }else{
      request = request.clone({
        url: environment.apiUrl + request.url
      });
    }
    return next.handle(request);
  }
}
