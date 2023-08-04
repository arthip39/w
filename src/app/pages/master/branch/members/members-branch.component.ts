import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TeamDTO } from 'src/app/models/team.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-members-branch',
  templateUrl: './members-branch.component.html',
})
export class MembersBranchComponent implements OnInit {

  public myArray = [1, 2, 3];

  id : string;

  team = new BehaviorSubject<TeamDTO[] | []>([])
  
  constructor(private branchService : BranchService , private route: ActivatedRoute) {}


  ngOnInit(): void {

    this.route.parent?.params.subscribe(parent=>{
      this.id = parent['id']
    })

    this.getTeam()
    
  }

  getTeam() {
    this.branchService.getTeam().subscribe(team => {
      const filter = team.filter(t => t.subcompanyId === this.id)
      filter.filter(f => {
        this.getMember(f.id)
      })
      this.team.next(filter)
    });
  }

  getMember(Id : string) {
    this.branchService.getMember().subscribe(member => {
      const filter = member.filter(m => m.teamId === Id)
      console.log(filter)
    })
  }
}
