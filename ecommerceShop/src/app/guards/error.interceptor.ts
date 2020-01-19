import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {

                    const unothorizedError = error;

                    if (unothorizedError.status === 401) {
                        if (unothorizedError.error != null) {
                            return throwError(unothorizedError.error);
                        }
                    }

                    if (unothorizedError.status === 0) {
                      return throwError('Connection failed to the server');
                    }
                    const applicationError = error.headers.get('Application-Error');

                    if (applicationError) {
                        return throwError(applicationError);
                    }

                    const serverError = error.error;
                    let modalStateErrors = '';

                    if (serverError && serverError.errors && typeof serverError.errors === 'object') {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modalStateErrors += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
