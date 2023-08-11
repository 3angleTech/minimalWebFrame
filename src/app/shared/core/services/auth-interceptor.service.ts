/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, switchMap, throwError } from 'rxjs';

import { IAuthService } from './auth.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isTokenRefreshing = false;

  constructor(
    private readonly authService: IAuthService,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedRequest = request.clone({
      withCredentials: true,
      headers: request.headers,
    });

    return next.handle(updatedRequest).pipe(
      catchError((error) => {
        if (this.isRequestUnauthorized(updatedRequest, error)) {
          return this.tryToRefreshToken(updatedRequest, next);
        }

        return throwError(() => error);
      }),
    );
  }

  private isRequestUnauthorized(request: HttpRequest<any>, error: any): boolean {
    const isErrorResponse = error instanceof HttpErrorResponse;
    const isRequestUnauthorized = error.status === HttpStatusCode.Unauthorized;
    const isLoginRequest = typeof request.body === 'string' ? request.body?.includes('grant_type=password') : false;

    return isErrorResponse && isRequestUnauthorized && !isLoginRequest;
  }

  private tryToRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          return next.handle(request);
        }),
        catchError((error) => {
          this.authService.logout().subscribe(() => {});
          return throwError(() => error);
        }),
        finalize(() => {
          this.isTokenRefreshing = false;
        }),
      );
    }

    return next.handle(request);
  }
}
