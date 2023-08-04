import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-overview-branch',
  templateUrl: './overview-branch.component.html',
})
export class OverviewBranchComponent implements OnInit {

  id: string = '';
  constructor(private branchService : BranchService,private route: ActivatedRoute) {}


  ngOnInit(): void {



  }
}
