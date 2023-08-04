import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLanguageModel } from 'src/app/models/user-language.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tables-widget1',
  templateUrl: './tables-widget1.component.html',
})
export class TablesWidget1Component  {

  lsUser : Observable<UserLanguageModel[] | []>;

  constructor(private userService: UserService) {
    this.lsUser = this.userService.getUserLanguage();
  }

}
