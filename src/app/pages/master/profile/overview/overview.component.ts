import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

  user$: Observable<UserProfileModel | undefined>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUserSubject.asObservable();

  }
}
