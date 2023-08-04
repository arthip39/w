import { Component, Input, OnInit } from '@angular/core';
import { IconUserModel } from '../../../cards/icon-user.model';

@Component({
  selector: 'app-tables-widget3',
  templateUrl: './tables-widget3.component.html',
})
export class TablesWidget3Component implements OnInit {

  @Input() title : string = '';
  @Input() icon : string = '';
  @Input() userNumber : number = 0;
  @Input() users : Array<IconUserModel> = [];


  constructor() {
  }

  ngOnInit(): void {}
}
