import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { ProvinceService } from 'src/app/services/province.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  form: FormGroup;
  private unsubscribe: Subscription[] = [];
  @Input('updateParentModel') updateParentModel: (
    part: Partial<UserProfileModel>,
    isFormValid: boolean
  ) => void;
  // @Input() defaultValues: Partial<UserProfileModel>;
  user$: Observable<UserProfileModel | undefined>;

  @Input() defaultValues: Partial<UserProfileModel>;

  lsProvince: DropDownDTO[] = [];

  _lsDistrict: DropDownDTO[] = [];
  get lsDistrict() {
    return this._lsDistrict.filter(x => x.parentId == this.defaultValues.province);
  }

  _lsSubDistrict: DropDownDTO[] = [];
  get lsSubDistrict() {
    return this._lsSubDistrict.filter(x => x.parentId == this.defaultValues.district);
  }

  constructor(private cdr: ChangeDetectorRef ,private userService: UserService ,private fb: FormBuilder , private provinceService: ProvinceService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    //  this.initForm();
    // this.updateParentModel({}, this.checkForm());
    this.user$ = this.userService.currentUserSubject.asObservable();
    this.getDbProvince();
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
  

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
