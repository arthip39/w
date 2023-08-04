import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEducationModel } from 'src/app/models/user-education.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lists-widget5',
  templateUrl: './lists-widget5.component.html',
})
export class ListsWidget5Component {

  lsUser : Observable<UserEducationModel[] | []>;

  constructor(private userService : UserService) {
    this.lsUser = this.userService.getUserEducation();
  }
}
