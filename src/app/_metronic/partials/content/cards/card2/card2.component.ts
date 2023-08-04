import { Component, Input, OnInit } from '@angular/core';
import { IconUserModel } from '../icon-user.model';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
})
export class Card2Component implements OnInit{
  // @Input() id : string = '';
  @Input() icon: string = '';
  @Input() badgeColor: string = '';
  @Input() status: string = '';
  @Input() statusColor: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() budget: string = '';
  @Input() progress: number = 50;
  // @Input() Link: string = '';
  @Input() users: Array<IconUserModel> = [];
  constructor() {}

  ngOnInit(): void {
    // console.log(this.title)
  }



  
}
