import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDownDTO } from '../models/drop-down.model';


@Injectable({
    providedIn: 'root',
})
export class ProvinceService {

    constructor(private httpClient: HttpClient) { }

    getProvince(): Observable<Array<DropDownDTO>> {

        return this.httpClient.get<Array<DropDownDTO>>('/Province/province');
    }

    getDistrict(): Observable<Array<DropDownDTO>> {

        return this.httpClient.get<Array<DropDownDTO>>('/Province/district');
    }

    getSubDistrict(): Observable<Array<DropDownDTO>> {

        return this.httpClient.get<Array<DropDownDTO>>('/Province/subdistrict');
    }
}
