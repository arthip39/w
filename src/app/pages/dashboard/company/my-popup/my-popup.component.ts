import { ChangeDetectorRef, Component, Inject, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Day } from "@progress/kendo-date-math";
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { InternshipService } from 'src/app/services/internshipform.service';
import { AccessTokenModel } from 'src/app/models/access-token.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-popup',
  templateUrl: './my-popup.component.html',
  styleUrls: ['./my-popup.component.scss'],
})
export class MyPopupComponent implements OnInit {
  @Input() data: any;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;

  popupInformation: any;

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

  public internYears = [
    { year: "ชั้นปีที่ 1" },
    { year: "ชั้นปีที่ 2" },
    { year: "ชั้นปีที่ 3" },
    { year: "ชั้นปีที่ 4" },
  ];

  registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyPopupComponent>,
    private cdr: ChangeDetectorRef,
    private internService: InternshipService,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      selectedDates: new FormControl(),
      // Add other form controls here
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }



  // saveInternForm() {
  //   this.isLoading$.next(true);
  
  //   // Prepare the data to be sent in the request
  //   const internshipFormData: InternshipFormModel = new InternshipFormModel();
  //   internshipFormData.internshipStart = this.popupInformation.internDateStart? this.popupInformation.internDateStart.toISOString(): null;
  //   internshipFormData.internshipEnd = this.popupInformation.internDateEnd? this.popupInformation.internDateEnd.toISOString(): null;
  //   internshipFormData.dueDate = this.popupInformation.dueDate? this.popupInformation.dueDate.toISOString(): null;
  //   internshipFormData.internYear = this.popupInformation.internYears;
  //   internshipFormData.convenientDate = this.popupInformation.interviewDate? this.popupInformation.interviewDate.toISOString(): null;
  //   internshipFormData.internComment = this.popupInformation.internComment;
  //   internshipFormData.laptop = this.popupInformation.laptop;
  
  //   // Call the postInternshipForm method with the prepared data
  //   this.internService.postInternshipForm(internshipFormData).subscribe(
  //     (response) => {
  //       console.log('Form submitted successfully:', response);
  //       this.isLoading$.next(false);
  //       this.dialogRef.close(); // Close the popup after a successful response
  //     },
  //     (error) => {
  //       console.error('Error submitting the form:', error);
  //       this.isLoading$.next(false);
  //       // Handle the error here, e.g., show an alert or a message to the user
  //     }
  //   );
  // }
}

// export class InternshipFormModel extends AccessTokenModel {
//   internshipStart: Date | null;
//   internshipEnd: Date | null;
//   dueDate: Date | null;
//   internYear: string;
//   convenientDate: Date | null;
//   internComment: string;
//   laptop: string;
//   hrComment: string;
//   active: boolean;

//   constructor() {
//     super();
//     this.internshipStart = null;
//     this.internshipEnd = null;
//     this.dueDate = null;
//     this.internYear = '';
//     this.convenientDate = null;
//     this.internComment = '';
//     this.laptop = '';
//     this.hrComment = '';
//     this.active = false;
//   }
// }
