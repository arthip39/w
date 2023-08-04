import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailsComponent } from './settings/forms/profile-details/profile-details.component';
import { ConnectedAccountsComponent } from './settings/forms/connected-accounts/connected-accounts.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { EmailPreferencesComponent } from './settings/forms/email-preferences/email-preferences.component';
import { NotificationsComponent } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent } from './settings/forms/sign-in-method/sign-in-method.component';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { TranslationModule } from '../i18n/translation.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { LabelModule } from "@progress/kendo-angular-label";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AccountComponent,
    OverviewComponent,
    SettingsComponent,
    ProfileDetailsComponent,
    ConnectedAccountsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
  ],
  imports: [
    TranslationModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    DropDownsModule,
    UploadsModule,
    LabelModule,
    DateInputsModule,
    InputsModule,
    ButtonsModule,
    MatIconModule,
    CommonModule,
    AccountRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
  ],
})
export class AccountModule {}
