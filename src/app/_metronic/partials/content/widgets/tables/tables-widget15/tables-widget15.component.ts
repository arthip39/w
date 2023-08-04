
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { EventDTO } from 'src/app/models/event.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tables-widget15',
  templateUrl: './tables-widget15.component.html',
  styleUrls: ['./tables-widget15.component.scss']
})
export class TablesWidget15Component implements OnInit {

  imgUrl: string = '/assets/Image/soft.png';
  lsSubCompany: SubCompanyDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
