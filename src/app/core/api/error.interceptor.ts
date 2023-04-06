import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly _service: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this._service.logout();
        }

        const error = err?.error?.errorDesc || 'Something went wrong, try again.';
        return throwError(error);
      })
    );
  }
}
