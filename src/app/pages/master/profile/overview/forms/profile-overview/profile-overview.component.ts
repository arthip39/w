import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
})
export class ProfileOverviewComponent implements OnInit {

  user$: Observable<UserProfileModel | undefined>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUserSubject.asObservable();

  }
}
