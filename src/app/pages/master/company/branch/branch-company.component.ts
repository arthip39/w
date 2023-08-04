import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, catchError, map, of } from 'rxjs';
import { IconUserModel } from 'src/app/_metronic/partials';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { AlertService } from 'src/app/services/alert.service';
import { BranchService } from 'src/app/services/branch.service';
import { ListCompanyService } from 'src/app/services/listcompany.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-branch-company',
  templateUrl: './branch-company.component.html',
  styleUrls: ['./branch-company.component.scss'],
})
export class BranchCompanyComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;
  // company: Observable<CompanyModel | undefined>;
  private unsubscribe: Subscription[] = [];

  // lsSubCompany = new BehaviorSubject<SubCompanyDTO[] | []>([]);
  lsSubCompany = new BehaviorSubject<SubCompanyDTO[] | []>([]);
  lsProvince: DropDownDTO[] = [];
  _lsDistrict: DropDownDTO[] = [];

  lsDistrict(provinceId: string): Array<DropDownDTO> {
    return this._lsDistrict.filter(x => x.parentId == provinceId);
  }

  _lsSubDistrict: DropDownDTO[] = [];
  lsSubDistrict(districtId: string): Array<DropDownDTO> {
    return this._lsSubDistrict.filter(x => x.parentId == districtId);
  }

  newSub = new Item();

  FACEBOOK_VALIDATOR = /^[a-zA-Zก-๏\s.]*$/;
  LETTERS_AND_SPACES_PATTERN_TH = /^[ก-๏\s]*$/;
  LETTERS_AND_SPACES_PATTERN_Eng = /^[a-zA-Z\s]*$/;
  LETTERS_AND_SPACES_PATTERN_nickname = /^[a-zA-Zก-๏\s]*$/;
  EMAIL_VALADATOR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})*$/;
  LINE_VALADATOR = /^[a-z0-9.-_]{0,50}$/;
  PHONE = /^[0-9]{0,10}$/;
  ZIPCODE = /^[0-9]{5}$/;

  constructor(private cdr: ChangeDetectorRef, private alertService: AlertService, private listCompanyService: ListCompanyService, private provinceService: ProvinceService , private branchService : BranchService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    const disableSubscr = this.saveDisable$
      .asObservable()
      .subscribe((res) => (this.saveDisable = res));
    this.unsubscribe.push(disableSubscr);

    this.getSubCompany();
    this.getDbProvince();
    this.getDbDistrict();
    this.getDbSubDistrict();
    this.sortActive();
    this.checkButton();
  }

  // onCardClick(i:number) {

  //   // const id = this.route.snapshot.paramMap.get('id');
  //   // console.log(id);
  //   this.lsSubCompany.subscribe(x => { 
  //     this.branchService.currentBranchValue = x[i]
  //     //  console.log(x[i])
  //   })
  // }

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
    this.lsSubCompany.subscribe(x => {
      x.sort((a, b) => {
        if (a.active && !b.active) {
          return -1;
        }
        else if (!a.active && b.active) {
          return 1; // b มี active เป็น true มาก่อน a
        }
        else {
          return 0; // ไม่มีการเปลี่ยนแปลง
        }
      })
    })
  }

  sortInActive(){
    this.lsSubCompany.subscribe(x => {
      x.sort((a, b) => {
        if (!a.active && b.active) {
          return -1;
        }
        else if (a.active && !b.active) {
          return 1; // b มี active เป็น true มาก่อน a
        }
        else {
          return 0; // ไม่มีการเปลี่ยนแปลง
        }
      })
    })
  }

  getSubCompany() {
    this.listCompanyService.getSubCompany().subscribe(lsSubcom => {
      this.lsSubCompany.next(lsSubcom)
    });
  }

  checkButton() {
    if (
      this.newSub.subCompanyName == '' ||
      this.newSub.provinceId == '' ||
      this.newSub.districtId == '' ||
      this.newSub.subdistrictId == '' ||
      this.newSub.zipcode == '' ||

      this.ZIPCODE.test(this.newSub.zipcode) == false ||
      this.PHONE.test(this.newSub.phone) == false ||
      // this.EMAIL_VALADATOR.test(this.newSub.email) == false || 
      this.FACEBOOK_VALIDATOR.test(this.newSub.facebook) == false ||
      this.LINE_VALADATOR.test(this.newSub.lineId) == false
    ) {

      this.saveDisable$.next(true);
      // console.log("ว่าง")
    }
    else {
      this.saveDisable$.next(false);
      // console.log("ไม่ว่าง")
    }
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

      console.log(this.newSub)
      this.checkButton();

      this.listCompanyService.postSubCompany(this.newSub).pipe(
        map(() => {
          this.alertService.onSuccess('Successfully New Branch.', '/master/company/branch');
          this.getSubCompany()
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('error', error);
          const errorMessage = error.error.message || 'An error occurred while new branch.';
          this.alertService.withOutTranslate.onError(errorMessage);
          return of(false);
        }),
      ).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );

      this.close('submit');
      // this.lsSubCompany.next([...this.lsSubCompany.getValue(), this.newSub])
      this.cdr.detectChanges();

      this.lsSubCompany.subscribe(lssub => {
        console.log(lssub)
      })
    }, 1500);
  }


  getDbProvince() {
    this.provinceService.getProvince().subscribe((res) => {
      this.lsProvince = res
    });
  }

  getDbDistrict() {
    this.provinceService.getDistrict().subscribe((res) => {
      this._lsDistrict = res
    });
  }

  getDbSubDistrict() {
    this.provinceService.getSubDistrict().subscribe((res) => {
      this._lsSubDistrict = res
    });
  }

  users1: Array<IconUserModel> = [
    { name: 'Emma Smith', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Rudy Stone', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users2 = [
    { name: 'Alan Warden', initials: 'A', color: 'warning' },
    { name: 'Brian Cox', avatar: './assets/media/avatars/300-5.jpg' },
  ];

  users3 = [
    { name: 'Mad Masy', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Cris Willson', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Mike Garcie', initials: 'M', color: 'info' },
  ];

  users4 = [
    { name: 'Nich Warden', initials: 'N', color: 'warning' },
    { name: 'Rob Otto', initials: 'R', color: 'success' },
  ];

  users5 = [
    { name: 'Francis Mitcham', avatar: './assets/media/avatars/300-20.jpg' },
    { name: 'Michelle Swanston', avatar: './assets/media/avatars/300-7.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users6 = [
    { name: 'Emma Smith', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Rudy Stone', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users7 = [
    { name: 'Meloday Macy', avatar: './assets/media/avatars/300-2.jpg' },
    { name: 'Rabbin Watterman', initials: 'S', color: 'success' },
  ];

  users8 = [
    { name: 'Emma Smith', avatar: './assets/media/avatars/300-6.jpg' },
    { name: 'Rudy Stone', avatar: './assets/media/avatars/300-1.jpg' },
    { name: 'Susan Redwood', initials: 'S', color: 'primary' },
  ];

  users9 = [
    { name: 'Meloday Macy', avatar: './assets/media/avatars/300-2.jpg' },
    { name: 'Rabbin Watterman', initials: 'S', color: 'danger' },
  ];

  public opened = false;

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    // if (status == 'cancel') {

    this.newSub.subCompanyName = ''
    this.newSub.addressDescription = ''
    this.newSub.provinceId = ''
    this.newSub.districtId = ''
    this.newSub.subdistrictId = ''
    this.newSub.phone = ''
    this.newSub.email = ''
    this.newSub.facebook = ''
    this.newSub.lineId = ''
    this.newSub.zipcode = ''
    // }
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }


}

export class Item {

  subCompanyId: string;
  subCompanyName: string;
  email: string;
  facebook: string;
  lineId: string;
  zipcode: string;
  phone: string;
  addressDescription: string;
  provinceId: string;
  subdistrictId: string;
  districtId: string;
  companyId: string;
  active: boolean;

  constructor() {
    // this.subCompanyId = '';
    // this.companyId = '';
    this.districtId = '';
    this.email = '';
    this.facebook = '';
    this.lineId = '';
    this.phone = '';
    this.provinceId = '';
    this.subCompanyName = '';
    this.subdistrictId = '';
    this.zipcode = '';
    this.addressDescription = '';
    this.active = true;

  }

}
