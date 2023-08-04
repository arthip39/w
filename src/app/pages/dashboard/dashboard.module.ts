// Module
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IntlModule } from "@progress/kendo-angular-intl";
import { DialogsModule } from '@progress/kendo-angular-dialog';

// Componenet
import { DashboardComponent } from './dashboard.component';
import { CompanyComponent } from './company/company.component';
import { SelectCompanyComponent } from './company/selectcompany/selectcompany.component';
import { MyPopupComponent } from './company/my-popup/my-popup.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CompanyComponent,
    SelectCompanyComponent,
    MyPopupComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WidgetsModule,
    ModalsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    UploadsModule,
    NgApexchartsModule,
    InlineSVGModule,
    DropDownsModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DateInputsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    IntlModule,
    DialogsModule,

  ],
  providers: [
    { provide: LOCALE_ID,
      useValue: 'th-TH',
      
    },
  ],
})
export class DashboardModule { }
