import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly _service: AppService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this._service.user;
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user}`,
        },
      });
    }

    return next.handle(request);
  }
}
