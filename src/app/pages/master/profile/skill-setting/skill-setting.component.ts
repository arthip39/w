import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subscription, take } from 'rxjs';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserSkillModel } from 'src/app/models/user-skill.model';
import { ObjectState } from 'src/app/services/state.enum';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-skill-setting',
    templateUrl: './skill-setting.component.html',
})
export class SkillSettingComponent implements OnInit, OnDestroy {
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;
    saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    saveDisable: boolean;
    private unsubscribe: Subscription[] = [];
    deletedItems: deletedItem[] = [];
    lsUser = new BehaviorSubject<UserSkillModel[] | []>([]);
    LETTERS_AND_SPACES_PATTERN = /^[a-zA-Zก-๏\s()#+]*$/;
    EMPTY = /^[0-9]*$/;

    constructor(private cdr: ChangeDetectorRef,private alertService: AlertService, private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.onStart();
        this.checkButton();
    }

    deleteTask(i:number,skill:any) {
        var state = skill.objectState
        this.lsUser.getValue().splice(i, 1);
        if (state != 2)
        {
          this.deletedItems.push(Object.assign(skill,{objectState:ObjectState.Deleted}))
        }
        this.checkButton()
    }

    addNewTask() {
        var newUser = new UserSkillModel();
        this.lsUser.next([...this.lsUser.getValue(), newUser])
        this.checkButton()
    }

    checkButton() {
        this.lsUser.subscribe(user=> {
          if (user.every(x=> x.name && this.LETTERS_AND_SPACES_PATTERN.test(x.name) && x.score ) ) {
            this.saveDisable$.next(false);
          }
          else {
            this.saveDisable$.next(true);
          }
        })
    }

    saveSettings() {
        this.isLoading$.next(true);
        setTimeout(() => {
            this.isLoading$.next(false);
            this.cdr.detectChanges();
            const saveItem = [...this.lsUser.getValue().filter(o=>o.objectState !== ObjectState.Normal), ...this.deletedItems];
            this.userService.postUserSkill(saveItem).pipe(
                map(() => {
                  this.alertService.onSuccess('Successfully edited the skill.', '/master/profile/overview');
                  return true;
                }),
                catchError((error: HttpErrorResponse) => {
                  console.error('error', error);
                  const errorMessage = error.error.message || 'An error occurred while edit skill.';
                  this.alertService.withOutTranslate.onError(errorMessage);
                  return of(false);
                })      
              ).subscribe(
                (response) => {
                  console.log(response);
                },
                (error) => {
                  console.error(error);
                }
              );
        }, 1500);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    onStart() {
        const loadingSubscr = this.isLoading$
            .asObservable()
            .subscribe((res) => (this.isLoading = res));
        this.unsubscribe.push(loadingSubscr);

        const disableSubscr = this.saveDisable$
            .asObservable()
            .subscribe((res) => (this.saveDisable = res));
        this.unsubscribe.push(disableSubscr);

        this.userService.getUserSkill().subscribe(user => {

            var setState = user.map((obj) => ({ ...obj, objectState: ObjectState.Normal }));
            this.lsUser.next(setState)
        })
    }

    onValueChange(item : any) {
        if (item.objectState == ObjectState.Normal) {
          item.objectState = ObjectState.Modified;

        }
        this.checkButton()
    }
}

export class deletedItem {
  id : string ;
  name : string ;
  score : string ;
  group : string ;
  objectState: ObjectState;

}
