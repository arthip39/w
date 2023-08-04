import { LoaderService } from './loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../models/access-token.model';
import { ErrorMessage } from '../models/error-message.interface';
import { UserProfileModel } from '../models/user-profile.model';
import { AlertService } from './alert.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { UserAccountModel } from '../models/user-register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private alertService: AlertService,
    private storageService: StorageService,
    private userService: UserService,
    private loaderService: LoaderService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  loginByEmail(
    email: string,
    password: string
  ): Observable<UserProfileModel | undefined> {
    this.loaderService.start();
    return this.httpClient
      .post<AccessTokenModel>(`/auth/login/email`, {
        email,
        password,
      })
      .pipe(
        map((auth: AccessTokenModel) => {
          const result = this.storageService.setAccessToken(auth);
          return result;
        }),
        switchMap(() => {
          return this.userService.getUserProfile()
        }),
        catchError((err: ErrorMessage) => {
          this.alertService.withOutTranslate.onError(err.message);
          return of(undefined);
        }),
        finalize(() => this.loaderService.stop())
      );
  }

  logout() {
    this.storageService.clearAll();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  registration(user: UserAccountModel): Observable<any> {
    this.loaderService.start();
    return this.httpClient.post(`/auth/register`, user).pipe(
      map(() => {
        this.loaderService.stop();
      }),
      // switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.loaderService.stop())
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.loaderService.start();
    return this.httpClient
      .post<boolean>(`/auth/forgot-password`, { email: email })
      .pipe(
        map(() => {
          this.loaderService.stop();
          return true;
        }),
        // switchMap(() => this.login(user.email, user.password)),
        catchError((err) => {
          console.error('err', err);
          return of(false);
        }),
        finalize(() => this.loaderService.stop())
      );
  }
}
