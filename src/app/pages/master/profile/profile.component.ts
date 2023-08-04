import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user$: Observable<UserProfileModel | undefined>;

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.user$ = this.userService.currentUserSubject.asObservable();
  }
}
