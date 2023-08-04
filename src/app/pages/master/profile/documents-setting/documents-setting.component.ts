import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAttachModel } from 'src/app/models/user-attach.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-documents-setting',
  templateUrl: './documents-setting.component.html',
})
export class DocumentsSettingComponent implements OnInit {

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;

    lsUser = new BehaviorSubject<UserAttachModel[] | []>([]);

    constructor(private cdr: ChangeDetectorRef ,private userService: UserService) {}

    ngOnInit(): void {

    }

    deleteTask(i:number,attach:any) {
      // this.deletedItems.forEach(item=> {this.deletedItems.push(item)})
      this.lsUser.getValue().splice(i, 1);
      // console.log(state)
      
  }

  addNewTask() {
      var newUser = new UserAttachModel();
      this.lsUser.next([...this.lsUser.getValue(), newUser])
  }

    saveSettings() {
        this.isLoading$.next(true);
        setTimeout(() => {
            this.isLoading$.next(false);
            this.cdr.detectChanges();
            
            // this.router.navigate(['/master/profile/overview']);

        }, 1500);

}

}
