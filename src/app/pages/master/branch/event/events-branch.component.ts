import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EventDTO } from 'src/app/models/event.model';
import { AlertService } from 'src/app/services/alert.service';
import { ListCompanyService } from 'src/app/services/listcompany.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-event-branch',
  templateUrl: './event-branch.component.html',
})
export class EventBranchComponent implements OnInit {

  private unsubscribe: Subscription[] = [];

  id : string;
  lsEvent = new BehaviorSubject<EventDTO[] | []>([]);

  FACEBOOK_VALIDATOR = /^[a-zA-Zก-๏\s.]*$/;
  LETTERS_AND_SPACES_PATTERN_TH = /^[ก-๏\s]*$/;
  LETTERS_AND_SPACES_PATTERN_Eng = /^[a-zA-Z\s]*$/;
  LETTERS_AND_SPACES_PATTERN_nickname = /^[a-zA-Zก-๏\s]*$/;
  EMAIL_VALADATOR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})*$/;
  LINE_VALADATOR = /^[a-z0-9.-_]{0,50}$/;
  PHONE = /^[0-9]{0,10}$/;
  ZIPCODE = /^[0-9]{5}$/;

  constructor(private cdr: ChangeDetectorRef, private alertService: AlertService, private listCompanyService: ListCompanyService, private provinceService: ProvinceService , private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.parent?.params.subscribe(parent=>{
      this.id = parent['id']
    })

    this.getEvent();
    this.sortActive();
    this.checkButton();

    // this.lsEvent.subscribe((events : EventDTO[]) => {
    //   events.forEach((event : EventDTO) => {
    //     console.log(event.createdDateTime)
    //   })
    // })

    // this.lsEvent.subscribe(e => console.log(e));
  }

  changeActive(e:string){
    // console.log(e)
    if (e == 'Active') {
      this.sortActive();
    }
    else {
      this.sortInActive();
    }
  }

  sortActive() {
    // this.lsSubCompany.subscribe(x => {
    //   x.sort((a, b) => {
    //     if (a.active && !b.active) {
    //       return -1;
    //     }
    //     else if (!a.active && b.active) {
    //       return 1; // b มี active เป็น true มาก่อน a
    //     }
    //     else {
    //       return 0; // ไม่มีการเปลี่ยนแปลง
    //     }
    //   })
    // })
  }

  sortInActive(){
    // this.lsSubCompany.subscribe(x => {
    //   x.sort((a, b) => {
    //     if (!a.active && b.active) {
    //       return -1;
    //     }
    //     else if (a.active && !b.active) {
    //       return 1; // b มี active เป็น true มาก่อน a
    //     }
    //     else {
    //       return 0; // ไม่มีการเปลี่ยนแปลง
    //     }
    //   })
    // })
  }

  getEvent() {
    this.listCompanyService.getEvent().subscribe(e => {
      // console.log(e[1].CreatedDateTime)
      const filteredEvents = e.filter(subCompany => subCompany.subCompanyId === this.id)
      // console.log(filteredEvents)
      this.lsEvent.next(filteredEvents)
    })
    // this.listCompanyService.getSubCompany().subscribe(lsSubcom => {
    //   this.lsEvent.next(lsSubcom)
    // });
  }

  checkButton() {
    // if (
    //   this.newSub.subCompanyName == '' ||
    //   this.newSub.provinceId == '' ||
    //   this.newSub.districtId == '' ||
    //   this.newSub.subdistrictId == '' ||
    //   this.newSub.zipcode == '' ||

    //   this.ZIPCODE.test(this.newSub.zipcode) == false ||
    //   this.PHONE.test(this.newSub.phone) == false ||
    //   // this.EMAIL_VALADATOR.test(this.newSub.email) == false || 
    //   this.FACEBOOK_VALIDATOR.test(this.newSub.facebook) == false ||
    //   this.LINE_VALADATOR.test(this.newSub.lineId) == false
    // ) {

    //   this.saveDisable$.next(true);
    //   // console.log("ว่าง")
    // }
    // else {
    //   this.saveDisable$.next(false);
    //   // console.log("ไม่ว่าง")
    // }
  }

  // saveSettings() {
  //   this.isLoading$.next(true);
  //   setTimeout(() => {
  //     this.isLoading$.next(false);

  //     console.log(this.newSub)
  //     this.checkButton();

  //     this.listCompanyService.postSubCompany(this.newSub).pipe(
  //       map(() => {
  //         this.alertService.onSuccess('Successfully New Branch.', '/master/company/branch');
  //         this.getSubCompany()
  //         return true;
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('error', error);
  //         const errorMessage = error.error.message || 'An error occurred while new branch.';
  //         this.alertService.withOutTranslate.onError(errorMessage);
  //         return of(false);
  //       }),
  //     ).subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );

  //     this.close('submit');
  //     // this.lsSubCompany.next([...this.lsSubCompany.getValue(), this.newSub])
  //     this.cdr.detectChanges();

  //     // this.lsSubCompany.subscribe(lssub => {
  //     //   console.log(lssub)
  //     // })

      

  //   }, 1500);
  // }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
