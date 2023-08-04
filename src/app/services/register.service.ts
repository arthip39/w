import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRegistrationForm } from '../modules/auth/components/registration/registration.interface';
import { StorageService } from './storage.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { ErrorMessage } from '../models/error-message.interface';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private alertService: AlertService,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  registration(registerform: IRegistrationForm): Observable<any> {
    console.log('Registration Form:', registerform)
    this.loaderService.start();
    return this.httpClient.post(`/Register/submit`, registerform).pipe(
      finalize(() => this.loaderService.stop())
    );
  }
}
