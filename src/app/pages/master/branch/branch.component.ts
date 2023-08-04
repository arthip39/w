import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { BranchService } from 'src/app/services/branch.service';
// import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;
  private unsubscribe: Subscription[] = [];
  id: string = '';
  subCompany : Observable<SubCompanyDTO | undefined>;
  opened = false;

  constructor(private branchService : BranchService , private route: ActivatedRoute , private router: Router) {}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.branchService.findBranch(params['id'])  
    })

    this.subCompany = this.branchService.currentBranchSubject.asObservable()


    // this.branchService.getSubCompany().subscribe(data => {
    //   const filterData = data.find(sub => sub.subCompanyId === this.id)
    //   this.sub.next(filterData)
    // });

  }

  close(status : string) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
