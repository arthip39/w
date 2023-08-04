import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { ProvinceService } from 'src/app/services/province.service';
import { UserService } from 'src/app/services/user.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;

  @ViewChild('fileUplod') fileUplod: ElementRef;
  private unsubscribe: Subscription[] = [];

  user : Observable<UserProfileModel | undefined>;
  cloneUser : any;
  lsProvince: DropDownDTO[] = [];
  _lsDistrict: DropDownDTO[] = [];

  lsDistrict(provinceId : string): Array<DropDownDTO> {
    return this._lsDistrict.filter(x => x.parentId == provinceId);
  }

  _lsSubDistrict: DropDownDTO[] = [];
  lsSubDistrict(districtId : string): Array<DropDownDTO> {
    return this._lsSubDistrict.filter(x => x.parentId == districtId);
  }

  LETTERS_AND_SPACES_PATTERN_TH = /^[ก-๏\s]*$/;
  LETTERS_AND_SPACES_PATTERN_Eng = /^[a-zA-Z\s]*$/;
  LETTERS_AND_SPACES_PATTERN_nickname = /^[a-zA-Zก-๏\s]*$/;
  EMAIL_VALADATOR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  LINE_VALADATOR = /^[a-z0-9.-_]{0,50}$/;
  PHONE = /^[0-9]{10}$/;
  ZIPCODE = /^[0-9]{5}$/;

  imgUrl: string = '';


  constructor(private cdr: ChangeDetectorRef,private appModule: AppModule ,private alertService: AlertService,private userService: UserService ,private fb: FormBuilder , private provinceService: ProvinceService ,private router: Router) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    
    const disableSubscr = this.saveDisable$
            .asObservable()
            .subscribe((res) => (this.saveDisable = res));
    this.unsubscribe.push(disableSubscr);
  }

  

  ngOnInit(): void {

    this.getProfile()
    console.log(this.userService.currentUserValue)
    this.user.subscribe(user=>{
      this.cloneUser = Object.assign({},user)
    })
    this.getDbProvince();
    this.getDbDistrict();
    this.getDbSubDistrict();
    this.checkButton()
  }

  getProfile () {
    this.user = this.userService.currentUserSubject.asObservable();
  }


  loadLocalFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('/assets/Image/man.png')
      reader.readAsDataURL(file);
    })
  }

  async onFileChange(event : any) {
    const files = event.target.files as FileList;
    if (files && files.length > 0)
    {
      this.imgUrl = URL.createObjectURL(files[0]);
      const url = await this.loadLocalFile(files[0]);
      var updatePictureUrl = {...this.cloneUser,pictureUrl:url}
      this.cloneUser = updatePictureUrl;
      this.fileUplod.nativeElement.value = '';
    }
    else { 

    }
  }

  checkButton() {
    if (this.cloneUser.firstnameTH == '' || 
    this.cloneUser.lastnameTH == '' || 
    this.cloneUser.firstnameEng == '' ||
    this.cloneUser.lastnameEng == '' ||
    this.cloneUser.nickname == '' ||
    this.cloneUser.gender == '' ||
    this.cloneUser.dateOfBirth == null || 
    this.cloneUser.phone == '' || 
    this.cloneUser.email == '' ||
    this.cloneUser.provinceId == '' ||
    this.cloneUser.districtId == '' ||
    this.cloneUser.subdistrictId == '' || 
    this.cloneUser.zipcode == '' ||

    this.LETTERS_AND_SPACES_PATTERN_TH.test(this.cloneUser.firstnameTH) != true ||
    this.LETTERS_AND_SPACES_PATTERN_TH.test(this.cloneUser.lastnameTH) != true ||
    this.LETTERS_AND_SPACES_PATTERN_Eng.test(this.cloneUser.firstnameEng) != true ||
    this.LETTERS_AND_SPACES_PATTERN_Eng.test(this.cloneUser.lastnameEng) != true ||
    this.LETTERS_AND_SPACES_PATTERN_nickname.test(this.cloneUser.nickname) != true ||
    this.EMAIL_VALADATOR.test(this.cloneUser.email) != true ||
    this.LINE_VALADATOR.test(this.cloneUser.line) != true ||
    this.PHONE.test(this.cloneUser.phone) != true ||
    this.ZIPCODE.test(this.cloneUser.zipcode) != true

    ){
      this.saveDisable$.next(true);
    }
    else {
      this.saveDisable$.next(false);
    }
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
      console.log(this.cloneUser)
      this.userService.postUserProfile(this.cloneUser).pipe(
        map(() => {
          this.alertService.onSuccess('Successfully edited the profile.', '/master/profile/overview');
          
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
      this.userService.currentUserValue = this.cloneUser;
      

    }, 1500);
    
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}


