import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, switchMap, throwError } from 'rxjs';

import { ServerApi } from '../enums/server-api.enum';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isTokenRefreshing = false;

  constructor(
    private readonly authService: AuthService,
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updatedRequest: HttpRequest<unknown> = request.clone({
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

  private isRequestUnauthorized(request: HttpRequest<unknown>, error: unknown): boolean {
    if (error instanceof HttpErrorResponse) {
      const isUnauthorized: boolean = error.status === HttpStatusCode.Unauthorized;
      if (isUnauthorized && request.url.endsWith(ServerApi.AuthToken)) {
        const authRequestBody: string = `${request.serializeBody()}`;
        if (authRequestBody.includes('grant_type=password') || authRequestBody.includes('grant_type=refresh_token')) {
          return false;
        }
      }
      return isUnauthorized;
    }
    return false;
  }

  private tryToRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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
