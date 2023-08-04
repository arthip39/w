import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { finalize, Observable } from "rxjs";
import { UserProfileModel } from "../models/user-profile.model";
import { IRegistrationForm } from "../modules/auth/components/registration/registration.interface";
import { AlertService } from "./alert.service";
import { LoaderService } from "./loader.service";
import { StorageService } from "./storage.service";

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
  
    saveProfile(user : UserProfileModel): Observable<any> {
      this.loaderService.start();
      return this.httpClient.put(`/User/profile`, user).pipe(
        finalize(() => this.loaderService.stop())
      );
    }
  }
  