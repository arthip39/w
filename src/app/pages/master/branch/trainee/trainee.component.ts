import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { BranchService } from 'src/app/services/branch.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.scss']
})
export class TraineeComponent implements OnInit {

    id : string;
    sub = new  BehaviorSubject<SubCompanyDTO | undefined>(undefined);
  
    constructor(private branchService : BranchService , private route: ActivatedRoute , private userService: UserService) {}
  
    user$: Observable<UserProfileModel | undefined>;

    ngOnInit(): void {
      this.user$ = this.userService.currentUserSubject.asObservable();
  
      this.route.parent?.params.subscribe(parent=>{
        this.id = parent['id']
      })
  
      this.branchService.getSubCompany().subscribe(data => { 
        const filterData = data.find(sub => sub.subCompanyId === this.id)
        this.sub.next(filterData)
      })
    }
}
