import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { Subscription } from 'rxjs';
import { IRegistrationForm } from '../../registration.interface';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;

  @Input() defaultValues: Partial<IRegistrationForm>;

  @ViewChild("textbox") public textbox: TextBoxComponent;
  @ViewChild("textbox2") public textbox2: TextBoxComponent;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());
  }

  initForm() {
    this.form = this.fb.group({
      Email: [this.defaultValues.Email, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      Password: [this.defaultValues.Password, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&]{8,16}$')]],
      ConfirmPassword: [this.defaultValues.ConfirmPassword, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&]{8,16}$')]],
    },
      {
        validators: this.mustMatch('Password', 'ConfirmPassword')
      }
    );

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }
  checkForm() {
    // อย่าลืมเอา comment ออก และ true/false
    return !(
      this.form.get('Email')?.hasError('required') ||
      this.form.get('Password')?.hasError('required') ||
      this.form.get('ConfirmPassword')?.hasError('required') ||
      this.form.get('Email')?.hasError('pattern') ||
      this.form.get('Password')?.hasError('pattern') ||
      this.form.get('ConfirmPassword')?.hasError('pattern') ||
      this.form.get('ConfirmPassword')?.hasError('mustMatch')
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = "password";
    this.textbox2.input.nativeElement.type = "password";
  }

  mustMatch(Password: any, ConfirmPassword: any) {

    return (form: FormGroup) => {

      const passwordControl = form.controls[Password];
      const ConfirmPasswordControl = form.controls[ConfirmPassword];

      if (ConfirmPasswordControl.errors && !ConfirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== ConfirmPasswordControl.value) {
        ConfirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        ConfirmPasswordControl.setErrors(null);
      }
    };
  }
  showpassword = false;
  toggleShow(): void {
    this.showpassword = !this.showpassword;
    const input = this.textbox.input.nativeElement;
    const input2 = this.textbox2.input.nativeElement;

    if (input.type === "password") {
      input.type = "text";
      input2.type = "text";
    } else {
      input.type = "password";
      input2.type = "password";
    }
    // this.showpassword = !this.showpassword
  }


}
