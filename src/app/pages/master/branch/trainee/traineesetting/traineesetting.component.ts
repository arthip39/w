import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-traineesetting',
  templateUrl: './traineesetting.component.html',
  styleUrls: ['./traineesetting.component.scss']
})
export class TraineesettingComponent {
    id : string;
    sub = new  BehaviorSubject<SubCompanyDTO | undefined>(undefined);
  
    constructor(private branchService : BranchService , private route: ActivatedRoute) {}
  
  
    ngOnInit(): void {
  
      this.route.parent?.params.subscribe(parent=>{
        this.id = parent['id']
      })
  
      this.branchService.getSubCompany().subscribe(data => { 
        const filterData = data.find(sub => sub.subCompanyId === this.id)
        this.sub.next(filterData)
      })
    }
}
