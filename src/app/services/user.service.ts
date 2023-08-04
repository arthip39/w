import { LoaderService } from './loader.service';
import { HttpClient } from '@angular/common/http';

import { EventEmitter, Injectable, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfileModel } from '../models/user-profile.model';
import { UserSkillModel } from '../models/user-skill.model';
import { UserEducationModel } from '../models/user-education.model';
import { UserLanguageModel } from '../models/user-language.model';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {

  // @Output() userProfileLoaded: EventEmitter<UserProfileModel> = new EventEmitter();
  
  private unsubscribe: Subscription[] = [];
  currentUserSubject: BehaviorSubject<UserProfileModel | undefined>;
  currentUser$: Observable<UserProfileModel | undefined>;

  get currentUserValue(): UserProfileModel | undefined {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserProfileModel | undefined ) {
    this.currentUserSubject.next(user);
  }

  isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;

  constructor(private httpClient: HttpClient,private loaderService:LoaderService) {
    this.currentUserSubject = new BehaviorSubject<UserProfileModel | undefined>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    const subscr = this.getUserProfile().subscribe();
    this.unsubscribe.push(subscr);

  }

  getUserProfile(): Observable<UserProfileModel | undefined> {
    this.loaderService.start()
    return this.httpClient.get<UserProfileModel>(`/user/profile`).pipe(
      map((user: UserProfileModel | undefined) => {
        if (user) {
          this.currentUserSubject.next(user);
          if (user.dateOfBirth) {
              user.dateOfBirth = new Date(user.dateOfBirth);
          }
        }
        
        return user;
      }),
      finalize(() => this.loaderService.stop())
    );
  }

  getUserSkill(): Observable<UserSkillModel[] | []> {
    this.loaderService.start()
    return this.httpClient.get<UserSkillModel[]>('/user/skill').pipe(
      finalize(() => this.loaderService.stop())
    );
  }

  getUserLanguage(): Observable<UserLanguageModel[] | []> {
    this.loaderService.start()
    return this.httpClient.get<UserLanguageModel[]>('/user/language').pipe(
      finalize(() => this.loaderService.stop())
    );
  }

  getUserEducation(): Observable<UserEducationModel[] | []> {
    this.loaderService.start()
    return this.httpClient.get<UserEducationModel[]>('/user/education').pipe(
      finalize(() => this.loaderService.stop())
    );
  }

  postUserProfile(userProfile : UserProfileModel | undefined): Observable<UserSkillModel | undefined> {
    this.loaderService.start()
    return this.httpClient.post<UserSkillModel | undefined>('/user/postprofile',userProfile).pipe(
      finalize(() => this.loaderService.stop())
    );
  }

  postUserSkill(userSkill : UserSkillModel[] | []): Observable<UserSkillModel[] | []> {
    this.loaderService.start()
    return this.httpClient.post<UserSkillModel[]>('/user/postskill',userSkill).pipe(
      finalize(() => this.loaderService.stop())
    );
  }

  postUserLanguage(userLanguage : UserLanguageModel[] | []): Observable<UserLanguageModel[] | []> {
    this.loaderService.start()
    return this.httpClient.post<UserLanguageModel[]>('/user/postlanguage',userLanguage).pipe(
      finalize(() => this.loaderService.stop())
    );
  }

  postUserEducation(userEducation : UserEducationModel[] | []): Observable<UserEducationModel[] | []> {
    this.loaderService.start()
    return this.httpClient.post<UserEducationModel[]>('/user/posteducation',userEducation).pipe(
      finalize(() => this.loaderService.stop())
    );
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
