import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DropDownListComponent } from "@progress/kendo-angular-dropdowns";
import { BehaviorSubject, Subscription, catchError, map, of } from "rxjs";
import { DropDownDTO } from "src/app/models/drop-down.model";
import { SubCompanyDTO } from "src/app/models/search-subcompany.model";
import { AlertService } from "src/app/services/alert.service";
import { BranchService } from "src/app/services/branch.service";
import { ProvinceService } from "src/app/services/province.service";

@Component({
    selector: 'app-branch-setting',
    templateUrl: './branch-setting.component.html',
  })
  export class BranchSettingComponent implements OnInit {
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;
  
    saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    saveDisable: boolean;
    
    // @ViewChild("dropdownlist", { static: true }) public dropdownlist: any;
    private unsubscribe: Subscription[] = [];

    id : string;
    sub = new  BehaviorSubject<SubCompanyDTO | undefined>(undefined);
    cloneSubCompany : any; 

    lsProvince: DropDownDTO[] = [];
    _lsDistrict: DropDownDTO[] = [];
  
    lsDistrict(provinceId : string): Array<DropDownDTO> {
      return this._lsDistrict.filter(x => x.parentId == provinceId);
    }
  
    _lsSubDistrict: DropDownDTO[] = [];
    lsSubDistrict(districtId : string): Array<DropDownDTO> {
      return this._lsSubDistrict.filter(x => x.parentId == districtId);
    }
    
    constructor(private cdr: ChangeDetectorRef, private provinceService: ProvinceService , private branchService : BranchService , private route: ActivatedRoute ,private alertService: AlertService) {}

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

      this.branchService.getSubCompany().subscribe(data => { 
        const filterData = data.find(sub => sub.subCompanyId === this.id)
        this.sub.next(filterData)
      })

      this.getDbProvince();
      this.getDbDistrict();
      this.getDbSubDistrict();

      this.getClone();
      
      this.checkButton();

    }

    getClone() {
      this.sub.subscribe(object => { 
        // console.log(object)
        this.cloneSubCompany = Object.assign({},object)
      })

    }

    checkButton(){

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

    saveSettings(){
      this.isLoading$.next(true);
      setTimeout(() => {
        this.isLoading$.next(false);
        this.cdr.detectChanges();

        this.branchService.postBranch(this.cloneSubCompany).pipe(
          map(() => {
            this.alertService.onSuccess('Successfully Create New Event', ["/master/branch/"+this.id].toString());
            this.branchService.findBranch(this.id);

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

      },1500)
    }
  }

  export class fakeData {
    pictureUrl : string;
    subCompanyId: string;
    subCompanyName: string;
    email : string;
    facebook : string;
    lineId : string;
    zipcode: string;
    phone: string;
    addressDescription: string;
    provinceName: string;
    subdistrictName: string;
    districtName: string;
    provinceId: string;
    subdistrictId: string;
    districtId: string;
    companyId: string;
    active: boolean;
  
  }