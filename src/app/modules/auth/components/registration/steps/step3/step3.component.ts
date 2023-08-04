import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { IRegistrationForm } from '../../registration.interface';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],

})
export class Step3Component implements OnInit, OnDestroy {
  districtDisabled = true;
  subdistrictDisabled = true;

  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  

  @Input() defaultValues: Partial<IRegistrationForm>;

  lsProvince: DropDownDTO[] = [];

  _lsDistrict: DropDownDTO[] = [];
  get lsDistrict() {
    return this._lsDistrict.filter(x => x.parentId == this.defaultValues.Province);
  }

  _lsSubDistrict: DropDownDTO[] = [];
  get lsSubDistrict() {
    return this._lsSubDistrict.filter(x => x.parentId == this.defaultValues.District);
  }
  

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private provinceService: ProvinceService) { }


  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());
    this.getDbProvince();
    this.getDbDistrict();
    this.getDbSubDistrict();
    this.districtDisabled = true;
    this.subdistrictDisabled = true;
  }

  initForm() {
    this.form = this.fb.group({
      Province: [this.defaultValues.Province, [Validators.required]],
      District: [{value: this.defaultValues.District, disabled: !this.defaultValues.District},[Validators.required]],
      SubDistrict: [{value: this.defaultValues.SubDistrict, disabled: !this.defaultValues.SubDistrict},[Validators.required]],
      Zipcode: [this.defaultValues.Zipcode, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      AddressDescription: [this.defaultValues.AddressDescription],
    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  checkForm() {
    //อย่าลืม ลบ ! or comment
    return !(

      this.form.get('Province')?.hasError('required') ||
      this.form.get('District')?.hasError('required') ||
      this.form.get('SubDistrict')?.hasError('required') ||
      this.form.get('Zipcode')?.hasError('required') ||
      this.form.get('Zipcode')?.hasError('pattern')
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getDbProvince() {
    this.provinceService.getProvince().subscribe((res) => {
      this.lsProvince = res
      // console.log(this.lsProvince)
    });
  }

  getDbDistrict() {

    this.provinceService.getDistrict().subscribe((res) => {
      this._lsDistrict = res
      // console.log(this.lsDistrict)
    });
  }

  getDbSubDistrict() {

    this.provinceService.getSubDistrict().subscribe((res) => {
      this._lsSubDistrict = res

      // console.log(this.lsSubDistrict)
    });
  }

  provinceOnChange() {
    const selectedProvince = this.form.get('Province')?.value;

    if (selectedProvince === '') {
      this.form.get('District')?.disable();
      this.form.get('District')?.setValue('');
      this.form.get('SubDistrict')?.disable();
      this.form.get('SubDistrict')?.setValue('');
    } else {
      this.form.get('District')?.enable();
      this.form.get('District')?.setValue('');
      this.form.get('SubDistrict')?.disable();
      this.form.get('SubDistrict')?.setValue('');
    }
  }

  districtOnChange() {
    const selectedDistrict = this.form.get('District')?.value;

    this.form.get('SubDistrict')?.enable();
    if (!selectedDistrict) {
      this.form.get('SubDistrict')?.disable();
      this.form.get('SubDistrict')?.setValue('');
    } else {
      this.provinceService.getSubDistrict().subscribe((data) => {
        this._lsSubDistrict = data;
        this.form.get('SubDistrict')?.setValue('');
      });
    }
  }

}

