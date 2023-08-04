import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { SelectCompanyComponent } from './company/selectcompany/selectcompany.component';
import { DashboardComponent } from './dashboard.component';
import { components } from 'src/app/_metronic/kt';
import { Routing } from '../routing';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent,
        children: [
          {
            path: 'selectcompany',
            component: SelectCompanyComponent,
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
