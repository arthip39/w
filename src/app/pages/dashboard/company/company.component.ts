import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, catchError, map, of } from 'rxjs';
import { ListCompanyService } from 'src/app/services/listcompany.service';
import { SubCompanyProfile } from 'src/app/models/subcompany-profile.model';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Day } from "@progress/kendo-date-math";
import { InternshipService } from 'src/app/services/internshipform.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

registerLocaleData(localeTh);

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'th-TH' }
  ],
})
export class CompanyComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;

  selectedCompany: any;
  public opened = false;
  internshipForm: InternshipFormModel = new InternshipFormModel();
  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    // if (status == 'cancel') {


    this.internshipForm.internshipStart = null;
    this.internshipForm.internshipEnd = null;
    this.internshipForm.dueDate = null;
    this.internshipForm.internYear = '';
    this.internshipForm.convenientDate = [];
    this.internshipForm.internComment = '';
    this.internshipForm.laptop = false;
    this.internshipForm.hrComment = '';
    this.internshipForm.active = true;
    // }
    this.opened = false;
  }

  public open(company: any): void {
    this.selectedCompany = {
      ...company,
      positionOptions: company.positionName.split(',').map((positionName: string, index: string) => ({
        positionId: index,
        positionName: positionName
      })),
    };
    this.opened = true;
  }

  public internYears: Array<string> = [
    "ชั้นปีที่ 1",
    "ชั้นปีที่ 2",
    "ชั้นปีที่ 3",
    "ชั้นปีที่ 4",
  ];

  public interviewdate: Date[] = [];
  public minDate: Date = new Date(); // set min date to current date
  public previousSelectedDates: Date[] = [];
  public disabledDates: Day[] = [Day.Saturday, Day.Sunday];

  public onChange(value: Date[]): void {
    let findDate = this.previousSelectedDates.find(
      (x) => x.getTime() === value[0].getTime()
    );

    if (findDate === undefined) {
      // Only add a date if there are less than 14 dates already selected
      if (this.previousSelectedDates.length < 14) {
        this.previousSelectedDates.push(value[0]);
      }
    } else {
      let index = this.previousSelectedDates.findIndex(
        (x) => x.getDate() === value[0].getDate()
      );

      this.previousSelectedDates.splice(index, 1);
    }

    this.interviewdate = [...this.previousSelectedDates];
  }

  imgUrl: string = '/assets/Image/soft.png';
  subcompanyProfile: SubCompanyProfile[] = [];
  
  isExpanded: boolean[] = [];
  currentExpandedIndex: number | undefined;
  company$: Observable<SubCompanyProfile | undefined>;

  toggleCompanyDetails(index: number) {
    if (this.currentExpandedIndex === index) {
      this.currentExpandedIndex = -1;
    } else {
      this.currentExpandedIndex = index;
    }
  }

  constructor(
    private listCompanyService: ListCompanyService,
    // Replace MatDialog with DialogService from Kendo UI
    private dialogService: DialogService,
    private internshipService: InternshipService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit() {
    this.isExpanded = new Array(this.subcompanyProfile.length).fill(false);
    this.listCompanyService.filteredSubCompanyProfiles$.subscribe((filteredProfiles) => {
      this.subcompanyProfile = filteredProfiles;
    });
  }


  onSubmit() {
    const internshipFormIso = {
      ...this.internshipForm,
      internshipStart: this.internshipForm.internshipStart ? this.internshipForm.internshipStart.toISOString() : null,
      internshipEnd: this.internshipForm.internshipEnd ? this.internshipForm.internshipEnd.toISOString() : null,
      dueDate: this.internshipForm.dueDate ? this.internshipForm.dueDate.toISOString() : null,
      internYear: this.internshipForm.internYear,
      convenientDate: this.internshipForm.convenientDate.map(date => date ? date.toISOString() : null),
      internComment: this.internshipForm.internComment,
      laptop: this.internshipForm.laptop,
      hrComment: this.internshipForm.hrComment,
      active: this.internshipForm.active
    };

    // Create a new InternshipFormModel instance and set its properties
    const internshipFormModel = new InternshipFormModel();
    Object.assign(internshipFormModel, internshipFormIso);

    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

      // console.log(this.internshipForm)
      // this.checkButton();

      this.internshipService.postInternshipForm(internshipFormModel).pipe(
        map(() => {
          this.alertService.onSuccess('Successfully Register', '/dashboard/company');
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
      this.cdr.detectChanges();

    }, 1500);
  }

}

export class InternshipFormModel {
  internshipStart: Date | null;
  internshipEnd: Date | null;
  dueDate: Date | null;
  internYear: string;
  convenientDate: Date[];
  internComment: string;
  laptop: boolean;
  hrComment: string;
  active: boolean;

  constructor() {
    this.internshipStart = null;
    this.internshipEnd = null;
    this.dueDate = null;
    this.internYear = '';
    this.convenientDate = [];
    this.internComment = '';
    this.laptop = false;
    this.hrComment = '';
    this.active = true;
  }
}
