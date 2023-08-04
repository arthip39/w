import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDownDTO } from '../models/drop-down.model';
import { IRegistrationForm } from '../modules/auth/components/registration/registration.interface';

@Injectable({
  providedIn: 'root',
})
export class EducationService {

  constructor(private httpClient: HttpClient) {

    // const subscr = this.getDegree().subscribe();

  }

  getDegree(): Observable<Array<DropDownDTO>> {

    return this.httpClient.get<Array<DropDownDTO>>('/Education/degree');
  }

  getAcademy(): Observable<Array<DropDownDTO>> {

    return this.httpClient.get<Array<DropDownDTO>>('/Education/academy');
  }

}