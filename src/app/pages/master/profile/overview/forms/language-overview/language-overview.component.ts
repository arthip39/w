import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLanguageModel } from 'src/app/models/user-language.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-language-overview',
  templateUrl: './language-overview.component.html',
})
export class LanguageOverviewComponent  {

  lsUser : Observable<UserLanguageModel[] | []>;

  constructor(private userService: UserService) {
    this.lsUser = this.userService.getUserLanguage();
  }

}
