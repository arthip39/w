import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEducationModel } from 'src/app/models/user-education.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-education-overview',
  templateUrl: './education-overview.component.html',
})
export class EducationOverviewComponent {

  lsUser : Observable<UserEducationModel[] | []>;

  constructor(private userService : UserService) {
    this.lsUser = this.userService.getUserEducation();
  }
}
