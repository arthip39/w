import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyModel } from 'src/app/models/company.model';
import { ListCompanyService } from 'src/app/services/listcompany.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',

})
export class CompanyComponent implements OnInit{

  company: Observable<CompanyModel | undefined>;

  constructor(private listCompanyService : ListCompanyService) { }

  ngOnInit(): void {
    this.company = this.listCompanyService.currentUserSubject.asObservable()    
  }

}
