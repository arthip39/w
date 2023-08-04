import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel } from 'src/app/models/company.model';
import { ListCompanyService } from 'src/app/services/listcompany.service';

type Tabs = 'Facebook';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  company: Observable<CompanyModel | undefined>;

  constructor(private listCompanyService : ListCompanyService) { }

  ngOnInit(): void {
    this.company = this.listCompanyService.currentUserSubject.asObservable()    
  }

}
