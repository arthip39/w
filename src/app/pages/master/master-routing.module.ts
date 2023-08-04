import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { DocumentsSettingComponent } from './profile/documents-setting/documents-setting.component';
import { DocumentsComponent } from './profile/documents/documents.component';
import { EducationSettingComponent } from './profile/education-setting/education-setting.component';
import { LanguageSettingComponent } from './profile/language-setting/language-setting.component';
import { OverviewComponent } from './profile/overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './profile/settings/setting.component';
import { SkillSettingComponent } from './profile/skill-setting/skill-setting.component';
import { CompanyComponent } from './company/company.component';
import { OverviewCompanyComponent } from './company/overview/overview-compony.component';
import { BranchCompanyComponent } from './company/branch/branch-company.component';
import { CompanySettingComponent } from './company/setting/company-setting.component';
import { BranchComponent } from './branch/branch.component';
import { OverviewBranchComponent } from './branch/overview/overview-branch.component';
import { EventBranchComponent } from './branch/event/events-branch.component';
// import { MembersBranchComponent } from './branch/members/members-branch.component';
import { EventSettingComponent } from './branch/event-setting/event-setting.component';
import { BranchSettingComponent } from './branch/branch-setting/branch-setting.component';
import { VideoComponent } from './profile/video/video.component';
import { TraineeComponent } from './branch/trainee/trainee.component';
import { EmployeesComponent } from './branch/employees/employees.component';
import { ApplicantsComponent } from './branch/applicants/applicants.component';
import { TraineesettingComponent } from './branch/trainee/traineesetting/traineesetting.component';
import { ContactComponent } from '../contact/contact.component';
import { components } from 'src/app/_metronic/kt';
import { EmployeeComponent } from './branch/employee/employee.component';
import { EmployeeAddComponent } from './branch/employee-add/employee-add.component';






const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent,
        children: [
          {
            path : 'overview',
            component : OverviewCompanyComponent
          },
          {
            path : 'branch',
            component : BranchCompanyComponent
          },
          {
            path : 'companysetting',
            component : CompanySettingComponent
          }
        ]
      },
      {
        path: 'branch/:id',
        component: BranchComponent,
        children: [
        {
          path: 'overview',
          component: OverviewBranchComponent,
        },
        {
          path: 'event',
          component: EventBranchComponent,
        },
        // {
        //   path: 'members',
        //   component: MembersBranchComponent,
        // },
        {
          path: 'eventsetting',
          component: EventSettingComponent,
        },
        {
          path: 'branchsetting',
          component : BranchSettingComponent
        },
        {
          path: 'trainee',
          component : TraineeComponent
        },
        {
          path: 'employees',
          component : EmployeesComponent
        },
        {
          path: 'applicants',
          component : ApplicantsComponent
        },

        {
          path: 'traineesetting',
          component : TraineesettingComponent
        },
        
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
       
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        
        children : [
          {
            path : 'overview',
            component : OverviewComponent
          },
          {
            path : 'documents',
            component : DocumentsComponent
          },
          {
            path : 'setting',
            component : SettingComponent
          },
          {
            path : 'skillsetting',
            component : SkillSettingComponent
          },
          {
            path : 'languagesetting',
            component : LanguageSettingComponent
          },
          {
            path : 'educationsetting',
            component : EducationSettingComponent
          },
          {
            path : 'documentssetting',
            component : DocumentsSettingComponent
          },

          {
            path : 'video',
            component : VideoComponent
          },

        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
