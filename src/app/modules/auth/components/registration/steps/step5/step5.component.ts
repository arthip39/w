import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IRegistrationForm, inits } from '../../registration.interface';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegistrationForm>;

  LANGUAGE_PATTERN = /^[a-zA-Zก-๏\s]*$/;
  SKILL_PATTERN = /^[a-zA-Zก-๏\s()#+]*$/;

  language: Language[] = [];

  skill: Skill[] = [];

  MAX_LANGUAGE_TASKS = 3;

  MAX_SKILL_TASKS = 3;



  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.language = this.defaultValues.language || [new Language()];
    this.skill = this.defaultValues.skill || [new Skill()];
    this.updateParentModel({}, this.checkForm());
  }

  languageOnChange() {
    // this.duplicate()
    this.updateParentModel({ language: this.language }, this.checkForm());
  }

  skillOnChange() {
    this.updateParentModel({ skill: this.skill }, this.checkForm());
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  checkForm() {
    // !ลบออกเพื่อ checkform 
    return (
      
      this.language.every(x => x.languageName && x.languageScore && this.LANGUAGE_PATTERN.test(x.languageName)) &&

      this.skill.every(x => x.skillName && x.skillScore) &&
      this.skill.every(x => this.SKILL_PATTERN.test(x.skillName))
    );
  }

  addNewLanguageTask() {
    if (this.language.length < this.MAX_LANGUAGE_TASKS) {
      this.language.push(new Language());
      this.languageOnChange();
    }
    // console.log(this.language)
  }

  deleteLanguageTask(i: any) {
    this.language.splice(i, 1);
    // this.languageOnChange();
    this.languageOnChange();

  }

  addNewSkillTask() {
    if (this.skill.length < this.MAX_SKILL_TASKS) {
      this.skill.push(new Skill());
      this.skillOnChange();
    }
    // console.log(this.skill);
  }

  deleteSkillTask(i: any) {
    this.skill.splice(i, 1);
    // this.skillOnChange();
    this.skillOnChange();
  }

}

export class Language {
  languageName: string = '';
  languageScore: string = '';
  languageGroup: string = 'language';
}

export class Skill {
  skillName: string = '';
  skillScore: string = '';
  skillGroup: string = 'skill';
}