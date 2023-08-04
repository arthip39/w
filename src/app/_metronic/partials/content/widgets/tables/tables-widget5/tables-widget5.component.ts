import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSkillModel } from 'src/app/models/user-skill.model';
import { UserService } from 'src/app/services/user.service';

type Tabs =
  | 'kt_table_widget_5_tab_1'
  | 'kt_table_widget_5_tab_2'
  | 'kt_table_widget_5_tab_3';

@Component({
  selector: 'app-tables-widget5',
  templateUrl: './tables-widget5.component.html',
})
export class TablesWidget5Component implements OnInit {

  lsUsers : Observable<UserSkillModel[] | []>;
  // lsUsers2 : UserAbilityModel[] = [];
  
  

  constructor(private userService: UserService) {
    this.lsUsers = this.userService.getUserSkill();
    
  }

  activeTab: Tabs = 'kt_table_widget_5_tab_1';

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  ngOnInit(): void {
    // this.lsUsers.push(this.userService.currentAbilitySubject.asObservable());
    // this.userService.currentAbilitySubject.subscribe((res)=>{
    //    = res ;

    // })
    
  }
}
