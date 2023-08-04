import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, map, of } from 'rxjs';
import { CompanyModel } from 'src/app/models/company.model';
import { AlertService } from 'src/app/services/alert.service';
import { ListCompanyService } from 'src/app/services/listcompany.service';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.component.html',

})
export class CompanySettingComponent implements OnInit{
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;
  
    saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    saveDisable: boolean;
    
    @ViewChild('fileUplod') fileUplod: ElementRef;
    company: Observable<CompanyModel | undefined>;
    private unsubscribe: Subscription[] = [];
    cloneCompany : any;
    imgUrl: string = '';

  constructor(private cdr: ChangeDetectorRef,private listCompanyService : ListCompanyService,private alertService: AlertService) { }

  ngOnInit(): void {
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
  this.unsubscribe.push(loadingSubscr);

  const disableSubscr = this.saveDisable$
    .asObservable()
    .subscribe((res) => (this.saveDisable = res));
  this.unsubscribe.push(disableSubscr);

  this.getCompany();

  this.company.subscribe(c => {
    this.cloneCompany = Object.assign({} , c)
  });
  }

  getCompany() {
    this.company = this.listCompanyService.currentUserSubject.asObservable()
  }

  loadLocalFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('/assets/Image/picture.png')
      reader.readAsDataURL(file);
    })
  }

  async onFileChange(event : any) {
    const files = event.target.files as FileList;
    if (files && files.length > 0)
    {
      this.imgUrl = URL.createObjectURL(files[0]);
      const url = await this.loadLocalFile(files[0]);
      var updatePictureUrl = {...this.cloneCompany,pictureUrl:url}
      this.cloneCompany = updatePictureUrl;
      this.fileUplod.nativeElement.value = '';
    }
    else { 

    }
  }

  checkButton() {
    if (this.cloneCompany.companyName == '') {
        this.saveDisable$.next(true);
    }
    else {
        this.saveDisable$.next(false);
    }

  }

  saveSettings(){
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      console.log(this.cloneCompany)
      this.listCompanyService.postCompany(this.cloneCompany).pipe(
        map(() => {
          this.alertService.onSuccess('Successfully edited the company.', '/#/master/company/overview');
          
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('error', error);
          const errorMessage = error.error.message || 'An error occurred while edit company.';
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
      this.listCompanyService.currentUserValue = this.cloneCompany;

    },1500)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
