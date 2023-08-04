import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';
import { InternshipFormModel } from '../pages/dashboard/company/company.component';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class InternshipService {
    constructor(private httpClient: HttpClient, private loaderService: LoaderService) { }

    postInternshipForm(internshipform: InternshipFormModel): Observable<any> {
        this.loaderService.start()
        return this.httpClient.post('/InternshipForm/postInternshipForm', {
          ...internshipform,
          convenientDates: internshipform.convenientDate
        }).pipe(
          finalize(() => this.loaderService.stop())
        )
      }
      
}