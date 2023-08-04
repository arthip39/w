import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserEducationModel } from 'src/app/models/user-education.model';
import { EducationService } from 'src/app/services/education.service';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { ObjectState } from 'src/app/services/state.enum';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-education-setting',
  templateUrl: './education-setting.component.html',
  styleUrls: ['./education-setting.component.scss'],
})
export class EducationSettingComponent implements OnInit, OnDestroy {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;

  private unsubscribe: Subscription[] = [];

  lsUser = new BehaviorSubject<UserEducationModel[] | []>([]);

  lsDegree: DropDownDTO[] = [];
  deletedItems: deletedItem[] = [];

  _lsAcademy: DropDownDTO[] = [];
  findAcademy(degreeId: string): Array<DropDownDTO> {
    return this._lsAcademy.filter(x => x.parentId == degreeId);
  }

  LETTERS_AND_SPACES_PATTERN = /^[a-zA-Zก-๏\s]*$/;
  GPA_PATTERN = /^([1-3](\.\d{1,2})?|4(\.00?)?)$/;
  MAX_EDUCATION_TASKS = 5;

  constructor(private cdr: ChangeDetectorRef,private alertService: AlertService, private userService: UserService, private educationService: EducationService, private router: Router) {

  }

  ngOnInit(): void {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    const disableSubscr = this.saveDisable$
      .asObservable()
      .subscribe((res) => (this.saveDisable = res));
    this.unsubscribe.push(disableSubscr);

    this.userService.getUserEducation().subscribe(user => {
      var setState = user.map((obj) => ({ ...obj, objectState: ObjectState.Normal }));

      this.lsUser.next(setState)
    })
    this.getDbDegree();
    this.getDbAcademy();
    this.checkButton();

  }

  deleteTask(i: number,education:any) {

    this.lsUser.getValue().splice(i, 1);
    if (education.objectState != 2) {
      this.deletedItems.push(Object.assign(education,{objectState:ObjectState.Deleted}))

    }
    this.checkButton();
  }

  addNewTask() {
    var newUser = new UserEducationModel()
    this.lsUser.next([...this.lsUser.getValue(), newUser])
    this.checkButton();
  }

  checkButton() {
    this.lsUser.subscribe(user=> {
      if (user.every(x=> x.degreeId && x.academyId && this.LETTERS_AND_SPACES_PATTERN.test(x.faculty) && x.gpa && this.GPA_PATTERN.test((x.gpa || 0)?.toString())) ) {
        this.saveDisable$.next(false);
      }
      else {
        this.saveDisable$.next(true);
      }
    })

    // this.education.every(x => x.degree) &&
    //   this.education.every(x => x.academy) &&
    //   this.education.every(x => this.LETTERS_AND_SPACES_PATTERN.test(x.faculty)) &&
    //   this.education.every(x => x.gpa && this.GPA_PATTERN.test((x.gpa || 0)?.toString()))
  }

  getDbDegree() {
    this.educationService.getDegree().subscribe((res) => {
      this.lsDegree = res
    })
  }

  getDbAcademy() {
    this.educationService.getAcademy().subscribe((res) => {
      this._lsAcademy = res
    })
  }

  onValueChange(item : any) {
    if (item.objectState == ObjectState.Normal) {
      item.objectState = ObjectState.Modified;

    }
    this.checkButton();
  }


  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      const saveItem = [...this.lsUser.getValue().filter(o=>o.objectState !== ObjectState.Normal), ...this.deletedItems];
            // console.log(saveItem)
      this.userService.postUserEducation(saveItem).pipe(
                map(() => {
                  this.alertService.onSuccess('Successfully edited the education', '/master/profile/overview');
                  return true;
                }),
                catchError((error: HttpErrorResponse) => {
                  console.error('error', error);
                  const errorMessage = error.error.message || 'An error occurred while edit education.';
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
}

export class deletedItem {
  id : string;
  faculty : string;
  gpa : string;
  degreeName : string;
  academyName : string;
  degreeId : string;
  academyId : string;
  objectState: ObjectState;

}

