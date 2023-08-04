import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit {

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;

    constructor(private cdr: ChangeDetectorRef ,private userService: UserService) {}

    ngOnInit(): void {

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
