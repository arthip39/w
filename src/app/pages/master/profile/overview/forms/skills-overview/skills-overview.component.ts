import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSkillModel } from 'src/app/models/user-skill.model';
import { UserService } from 'src/app/services/user.service';

type Tabs =
  | 'kt_table_widget_5_tab_1'
  | 'kt_table_widget_5_tab_2'
  | 'kt_table_widget_5_tab_3';

@Component({
  selector: 'app-skills-overview',
  templateUrl: './skills-overview.component.html',
})
export class SkillsOverviewComponent implements OnInit {

  lsUsers : Observable<UserSkillModel[] | []>;
  // lsUsers2 : UserAbilityModel[] = [];
  
  

  constructor(private userService: UserService) {
    
  }

  activeTab: Tabs = 'kt_table_widget_5_tab_1';

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  ngOnInit(): void {
    this.lsUsers = this.userService.getUserSkill();
    
  }
}
