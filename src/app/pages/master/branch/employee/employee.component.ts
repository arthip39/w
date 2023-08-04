import { ChangeDetectorRef, Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { EventDTO } from 'src/app/models/event.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { AlertService } from 'src/app/services/alert.service';
import { ListCompanyService } from 'src/app/services/listcompany.service';
import { ProvinceService } from 'src/app/services/province.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  user$: Observable<UserProfileModel | undefined>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUserSubject.asObservable();
  }
}
