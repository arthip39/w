import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IRegistrationForm } from '../../registration.interface';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit, OnDestroy {

  // 'http://cdn.onlinewebfonts.com/svg/img_329115.png'

  @ViewChild('fileUplod')
  fileUplod: ElementRef;
  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegistrationForm>;

  // @ViewChild('avatarinputfile') fileInput:ElementRef;
  private unsubscribe: Subscription[] = [];
  imgUrl: string = '/assets/Image/man.png';

  constructor(private fb: FormBuilder) {
  }
  loadLocalFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('/assets/Image/man.png')
      reader.readAsDataURL(file);
      
    })
  }
  async onFileChange(event: any) {
    
    const files = event.target.files as FileList;
    if (files && files.length > 0) {
      this.imgUrl = URL.createObjectURL(files[0]);
      const url = await this.loadLocalFile(files[0]);
      this.form.patchValue({
        Photoprofile: url,
      }, { emitEvent: true });
      this.fileUplod.nativeElement.value = '';
      
    }
    else {
      this.form.patchValue({
        Photoprofile: null
      });
    }
  }

  // resetInput(): void {
  //   const input = document.getElementById('avatar-input-file') as HTMLInputElement;
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // onFileChange(event: any) {
  //   const files = event.target.files as FileList;
  //   const reader = new FileReader();
  //   if (files.length > 0) {
  //     reader.onload = () => {
  //       const base64String = reader.result as string;
  //       console.log(base64String);
  //       this.imgUrl = base64String;
  //       this.form.get('Photoprofile')?.setValue(base64String);
  //     }
  //     reader.readAsDataURL(files[0]);
  //     this.resetInput();
  //   }
  // }



  // getFileDetails (event : any) {
  //   for (var i = 0; i < event.target.files.length; i++) { 
  //     var name = event.target.files[i].name;
  //     var type = event.target.files[i].type;
  //     var size = event.target.files[i].size;
  //     var modifiedDate = event.target.files[i].lastModifiedDate;

  //     console.log ('Name: ' + name + "\n" + 
  //       'Type: ' + type + "\n" +
  //       'Last-Modified-Date: ' + modifiedDate + "\n" +
  //       'Size: ' + Math.round(size / 1024) + " KB");
  //   }
  // }

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());

    if (this.form.controls.Photoprofile.value) {
      this.imgUrl = this.form.controls.Photoprofile.value
    }
  }

  initForm() {
    this.form = this.fb.group({
      Photoprofile: [this.defaultValues.Photoprofile, [Validators.required]],
      firstNameTH: [this.defaultValues.firstNameTH, [Validators.required, Validators.maxLength(80), Validators.pattern('^[ก-๏\s]+$')]],
      lastNameTH: [this.defaultValues.lastNameTH, [Validators.required, Validators.maxLength(80), Validators.pattern('^[ก-๏\s]+$')]],
      firstNameEng: [this.defaultValues.firstNameEng, [Validators.required, Validators.maxLength(80), Validators.pattern('^[a-zA-Z]+')]],
      lastNameEng: [this.defaultValues.lastNameEng, [Validators.required, Validators.maxLength(80), Validators.pattern('^[a-zA-Z]+')]],
      nickName: [this.defaultValues.nickName, [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Zก-๏\s]+$')]],
      gender: [this.defaultValues.gender, [Validators.required]],
      DateOfBirth: [this.defaultValues.DateOfBirth, [Validators.required]],
      phoneNumber: [this.defaultValues.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      lineAccountId: [this.defaultValues.lineAccountId, [Validators.maxLength(50), Validators.pattern('^[a-z0-9.-_]{0,50}$')]],
    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  checkForm() {
    //อย่าลืมเอา ! ออก
    return !(
      this.form.get('Photoprofile')?.hasError('required') ||
      this.form.get('firstNameTH')?.hasError('required') ||
      this.form.get('lastNameTH')?.hasError('required') ||
      this.form.get('firstNameEng')?.hasError('required') ||
      this.form.get('lastNameEng')?.hasError('required') ||
      this.form.get('nickName')?.hasError('required') ||
      this.form.get('gender')?.hasError('required') ||
      this.form.get('dateOfBrith')?.hasError('required') ||
      this.form.get('phoneNumber')?.hasError('required') ||
      this.form.get('lineAccountId')?.hasError('pattern')
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
