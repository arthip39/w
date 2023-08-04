import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberFormatOptions } from '@progress/kendo-angular-intl';
import { BehaviorSubject, Subscription, catchError, map, of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { EventDTO } from 'src/app/models/event.model';
import { EventItemDTO } from 'src/app/models/eventitem.model';
import { PositionDTO } from 'src/app/models/position.model';
import { WorkTimeDTO } from 'src/app/models/workTime.model';
import { AlertService } from 'src/app/services/alert.service';
import { ListCompanyService } from 'src/app/services/listcompany.service';
import { ProvinceService } from 'src/app/services/province.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-setting',
  templateUrl: './event-setting.component.html',
})
export class EventSettingComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;

  private unsubscribe: Subscription[] = [];

  id : any ;

  lsGroup: DropDownDTO[] = [];
  lsPosition: PositionDTO[] = [];
  findPosition(groupId: string): Array<PositionDTO> {
    return this.lsPosition.filter(x => x.groupId == groupId);
  }

  jobPosition: eventJob[] = [];

  event = new EventDTO();

  eventItem: EventItemDTO[] = [];

  workTimes = new workTime();

  // public formatOptions: NumberFormatOptions = {
  //   style: "currency",
  //   currency: "EUR",
  //   currencyDisplay: "name",
  // };

  constructor(private cdr: ChangeDetectorRef, private listCompany: ListCompanyService, private appModule: AppModule, private alertService: AlertService, private userService: UserService, private fb: FormBuilder, private provinceService: ProvinceService, private router: Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    const disableSubscr = this.saveDisable$
      .asObservable()
      .subscribe((res) => (this.saveDisable = res));
    this.unsubscribe.push(disableSubscr);

    this.route.parent?.params.subscribe(parent=>{
      this.id = parent['id']
    })

    this.event.subCompanyId = this.id;

    this.getPosition();
    this.getPositionGroup();

    this.jobPosition = [new eventJob()];

    this.checkButton();

  }

  checkButton() {
    this.jobPosition.some((eventJob) => {
      // console.log(eventJob.groupId)
      if (eventJob.groupId == '' || 
      eventJob.positionId == '' || 
      eventJob.PositionNumber == null || 
      eventJob.PositionNumber == 0 || 
      this.event.eventName == '' || 
      this.event.eventProperty == '' || 
      this.event.scholarship == 0 || 
      this.event.scholarship == null) {
        this.saveDisable$.next(true);

      }
      else {
        this.saveDisable$.next(false);

      }
    })

  }

  addNewTask() {
    this.jobPosition.push(new eventJob());
  }

  deleteTask() {
    if (this.jobPosition.length > 1) {
      this.jobPosition.pop()
    }
    // this.jobPosition.splice(i, 1);

  }

  getPosition() {
    this.listCompany.getPosition().subscribe(som => {
      som.sort((a, b) => a.positionName.localeCompare(b.positionName))
      this.lsPosition = som
    })
  }

  getPositionGroup() {

    this.listCompany.getPositionGroup().subscribe(s => {
      s.sort((a, b) => a.label.localeCompare(b.label))
      this.lsGroup = s;
    })
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();

      const params = {
        Events : this.event ,
        WorkTimes : this.workTimes,
        EventItems : this.jobPosition
    }

      this.listCompany.postEvent(params).pipe(
        map(() => {
          this.alertService.onSuccess('Successfully Create New Event', ["/master/branch/"+this.id+"/event"].toString());
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('error', error);
          const errorMessage = error.error.message || 'An error occurred while Create New Event.';
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

  public listItems: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

}

export class eventJob {
  groupId: string;
  positionId: string;
  PositionNumber: number;

  constructor() {
    this.groupId = '3aadddba-d7a4-427c-8d3b-6a4bf29c32e8';
    this.positionId = 'edbdb58a-0cf6-4a8e-ab2d-64432234a2b7';
    this.PositionNumber = 80;
  }

}

export class  workTime {
  WorktimeId: string;
  InWorkDay: string;
  OutWorkDay: string;
  WorkStartTime: Date;
  WorkEndTime: Date;

  constructor() {
    
      this.InWorkDay = 'Monday';
      this.OutWorkDay = 'Friday';
      this.WorkStartTime = new Date(0, 0, 0, 8, 30);
      this.WorkEndTime = new Date(0, 0, 0, 17, 30);

  }
}

