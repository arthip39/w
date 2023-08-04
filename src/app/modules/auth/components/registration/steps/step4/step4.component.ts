import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { EducationService } from 'src/app/services/education.service';
import { IRegistrationForm } from '../../registration.interface';


@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],

})
export class Step4Component implements OnInit, OnDestroy {

  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;

  @Input() defaultValues: Partial<IRegistrationForm>;

  LETTERS_AND_SPACES_PATTERN = /^[a-zA-Zก-๏\s]*$/;
  GPA_PATTERN = /^([1-3](\.\d{1,2})?|4(\.00?)?)$/;
  MAX_EDUCATION_TASKS = 4;

  education: Education[] = [];

  lsDegree: DropDownDTO[] = [];

  _lsAcademy: DropDownDTO[] = [];
  findAcademy(degreeId: string): Array<DropDownDTO> {
    return this._lsAcademy.filter(x => x.parentId == degreeId);
  }

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private educationService: EducationService) { }

  

  ngOnInit() {
    this.getDbDegree();
    this.getDbAcademy();
    this.education = this.defaultValues.Education || [new Education()];
    this.updateParentModel({}, this.checkForm());
  }

  onChangeDegree(i: number) {
    //console.log('change',this.education)
    // this.education.every(x=>x.academy = '')
    this.education[i].academy = '';
    this.updateParentModel({ Education: this.education }, this.checkForm());

  }

  onChange() {
    //console.log('change',this.education)
    this.updateParentModel({ Education: this.education }, this.checkForm());

  }

  // selectionChange() {
  //   const defaultAcademy = '';
  //   this.findAcademy(defaultAcademy);
  // }

  checkForm() {
    // ! อย่าลืมเอาออก
    return (
      this.education.every(x => x.degree) &&
      this.education.every(x => x.academy) &&
      this.education.every(x => this.LETTERS_AND_SPACES_PATTERN.test(x.faculty)) &&
      this.education.every(x => x.gpa && this.GPA_PATTERN.test((x.gpa || 0)?.toString()))
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
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

  addNewTask() {
    if (this.education.length < this.MAX_EDUCATION_TASKS) {
      this.education.push(new Education());
      this.onChange()
    }

    //console.log(this.education)
  }

  deleteTask(i: any) {
    this.education.splice(i, 1);
    this.onChange()
  }

}

export class Education {
  degree: string = '';
  academy: string = '';
  faculty: string = '';
  gpa?: number = undefined;
}
