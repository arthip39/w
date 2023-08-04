import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  id : string;
    sub = new  BehaviorSubject<SubCompanyDTO | undefined>(undefined);

}
