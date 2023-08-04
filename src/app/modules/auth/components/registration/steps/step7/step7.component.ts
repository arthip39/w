import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IRegistrationForm, inits } from '../../registration.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import { RegisterService  } from 'src/app/services/register.service';


@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
})
export class Step7Component implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegistrationForm>;
  public textAreaValue = `Here are the terms and conditions of service. Please read them carefully before using our website.

  1. INTRODUCTION
Welcome to our website. These terms and conditions of service govern your use of our website and any services provided through the website. By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms you may not use the Service.

  2. Use of the Service
You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service In any way that violates any applicable federal, state, local, or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the US or other countries). To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm us or users of the Service or expose them to liability. To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.

  3. Intellectual Property Rights 
The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof), are owned by us, our licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

  4. Disclaimer of Warranties
The Service is provided "as is" and "as available" without any representations or warranties of any kind, express or implied. We make no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on or otherwise made available to you through the Service. You expressly agree that your use of the Service is at your sole risk.

  5. Limitation of Liability
In no event shall we, our affiliates, or our respective officers, directors, employees, agents, suppliers, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service, (ii) any conduct or content of any third party on the Service, (iii) any content obtained from the Service, or (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.`;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
     private http: HttpClient,
     private router: Router,
     /*,  private registerService: RegisterService*/
     ) { }

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());
    this.checkRegister();
  }

  initForm() {
    this.form = this.fb.group({
      formcheckbox: ['', Validators.required],

    },
    );

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }


  checkForm() {
    return !(
      this.form.get('formcheckbox')?.hasError('required')
    );
  }

  checkRegister() {
    const registrationForm: IRegistrationForm = {
      //step1
      Email: this.defaultValues?.Email || '',
      Password: this.defaultValues?.Password || '',
      ConfirmPassword: this.defaultValues?.ConfirmPassword || '',
      //step2
      Photoprofile: this.defaultValues.Photoprofile ,
      firstNameTH: this.defaultValues?.firstNameTH || '',
      lastNameTH: this.defaultValues?.lastNameTH || '',
      firstNameEng: this.defaultValues?.firstNameEng || '',
      lastNameEng: this.defaultValues?.lastNameEng || '',
      nickName: this.defaultValues?.nickName || '',
      gender: this.defaultValues?.gender || '',
      DateOfBirth: this.defaultValues?.DateOfBirth ,
      phoneNumber: this.defaultValues?.phoneNumber || '',
      lineAccountId: this.defaultValues?.lineAccountId || '',
      //step3
      SubDistrict: this.defaultValues.SubDistrict || '',
      District: this.defaultValues.District || '',
      Province: this.defaultValues.Province || '',
      Zipcode: this.defaultValues.Zipcode || '',
      AddressDescription: this.defaultValues?.AddressDescription || '',
      //step4
      Education: this.defaultValues.Education || [],
      //step5
      language: this.defaultValues.language || [],
      skill: this.defaultValues.skill || [],
      //step6
      myFiles: this.defaultValues.myFiles || [],
      links: this.defaultValues.links || []
    };

    console.log('RegistrationForm data:', registrationForm);

  }
}
