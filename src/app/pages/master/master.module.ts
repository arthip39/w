import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MasterComponent } from "./master.component";
// import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { MatIconModule } from '@angular/material/icon';
import { TranslationModule } from "src/app/modules/i18n";
import { OverviewComponent } from "./profile/overview/overview.component";
import { SettingComponent } from "./profile/settings/setting.component";
import { CardsModule, DropdownMenusModule, WidgetsModule } from "src/app/_metronic/partials";
import { ProfileComponent } from "./profile/profile.component";
import { LabelModule } from "@progress/kendo-angular-label";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { ProfileDetailsComponent } from "./profile/settings/forms/profile-details/profile-details.component";
import { ConnectedAccountsComponent } from "./profile/settings/forms/connected-accounts/connected-accounts.component";
import { DeactivateAccountComponent } from "./profile/settings/forms/deactivate-account/deactivate-account.component";
import { EmailPreferencesComponent } from "./profile/settings/forms/email-preferences/email-preferences.component";
import { NotificationsComponent } from "./profile/settings/forms/notifications/notifications.component";
import { SignInMethodComponent } from "./profile/settings/forms/sign-in-method/sign-in-method.component";
import { routes } from "src/app/app-routing.module";
import { MasterRoutingModule } from "./master-routing.module";
import { FormsModule } from '@angular/forms';
import { EducationSettingComponent } from "./profile/education-setting/education-setting.component";
import { SkillSettingComponent } from "./profile/skill-setting/skill-setting.component";
import { LanguageSettingComponent } from "./profile/language-setting/language-setting.component";
import { SkillsOverviewComponent } from "./profile/overview/forms/skills-overview/skills-overview.component";
import { LanguageOverviewComponent } from "./profile/overview/forms/language-overview/language-overview.component";
import { EducationOverviewComponent } from "./profile/overview/forms/education-overview/education-overview.component";
import { ProfileOverviewComponent } from "./profile/overview/forms/profile-overview/profile-overview.component";
import { DocumentsComponent } from "./profile/documents/documents.component";
import { DocumentsSettingComponent } from "./profile/documents-setting/documents-setting.component";
import { OverviewCompanyComponent } from "./company/overview/overview-compony.component";
import { CompanyComponent } from "./company/company.component";
import { BranchCompanyComponent } from "./company/branch/branch-company.component";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { CompanySettingComponent } from "./company/setting/company-setting.component";
import { BranchComponent } from "./branch/branch.component";
import { OverviewBranchComponent } from "./branch/overview/overview-branch.component";
import { BranchDetailsComponent } from "./branch/overview/forms/branch-details/branch-details.component";
import { EventsTasksComponent } from "./branch/overview/forms/events-tasks/events-tasks.component";
import { MemberTeamsComponent } from "./branch/overview/forms/member-teams/member-teams.component";
import { TeamSummaryComponent } from "./branch/overview/forms/team-summary/team-summary.component";
// import { MembersBranchComponent } from "./branch/members/members-branch.component";
import { EventSettingComponent } from "./branch/event-setting/event-setting.component";
import { EventBranchComponent } from "./branch/event/events-branch.component";
import { BranchSettingComponent } from "./branch/branch-setting/branch-setting.component";
import { VideoComponent } from './profile/video/video.component';
import { TraineeComponent } from './branch/trainee/trainee.component';
import { EmployeesComponent } from './branch/employees/employees.component';
import { ApplicantsComponent } from './branch/applicants/applicants.component';
import { TraineesettingComponent } from './branch/trainee/traineesetting/traineesetting.component';
import { EmployeeComponent } from './branch/employee/employee.component';
import { EmployeeAddComponent } from './branch/employee-add/employee-add.component';


@NgModule({
  declarations : [
    BranchCompanyComponent,
    CompanyComponent,
    OverviewCompanyComponent,
    DocumentsComponent,
    DocumentsSettingComponent,
    EducationSettingComponent,
    SkillSettingComponent,
    LanguageSettingComponent,
    MasterComponent,
    ProfileComponent,
    OverviewComponent,
    SettingComponent,
    ProfileDetailsComponent,
    ConnectedAccountsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
    SkillsOverviewComponent,
    LanguageOverviewComponent,
    EducationOverviewComponent,
    ProfileOverviewComponent,
    CompanySettingComponent,
    ApplicantsComponent,

    BranchComponent,
    OverviewBranchComponent,
    BranchDetailsComponent,
    EventsTasksComponent,
    MemberTeamsComponent,
    TeamSummaryComponent,
    // MembersBranchComponent,
    EventSettingComponent,
    EventBranchComponent,
    BranchSettingComponent,
    VideoComponent,
    TraineeComponent,
    EmployeesComponent,
    ApplicantsComponent,
    TraineesettingComponent,
    BranchSettingComponent,
    TraineeComponent,
    ApplicantsComponent,
    EmployeeComponent,
    EmployeeAddComponent,
  
    
    
  ],
  imports:[
    DialogModule,
    CardsModule,
    FormsModule,
    CommonModule,
    InlineSVGModule,
    ReactiveFormsModule,
    TranslationModule,
    DropdownMenusModule,
    WidgetsModule,
    NgbTooltipModule,
    DropDownsModule,
    LabelModule,
    DateInputsModule,
    InputsModule,
    ButtonsModule,
    MatIconModule,
    UploadsModule,
    MasterRoutingModule
  ],
})
export class MasterModule {}
