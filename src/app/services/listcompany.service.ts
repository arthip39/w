import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, finalize, map } from 'rxjs';
import { EventDTO } from '../models/event.model';
import { EventItemDTO } from '../models/eventitem.model';
import { PositionDTO } from '../models/position.model';
import { SubCompanyDTO } from '../models/search-subcompany.model';
import { WorkTimeDTO } from '../models/workTime.model';
import { CompanyModel } from '../models/company.model';
import { LoaderService } from './loader.service';
import { SubCompanyProfile } from 'src/app/models/subcompany-profile.model';
import { Item } from '../pages/master/company/branch/branch-company.component';
import { DropDownDTO } from '../models/drop-down.model';
import { eventJob, workTime } from '../pages/master/branch/event-setting/event-setting.component';

@Injectable({
    providedIn: 'root',
})
export class ListCompanyService {
    
    private filteredSubCompanyProfilesSource = new BehaviorSubject<SubCompanyProfile[]>([]);
    filteredSubCompanyProfiles$ = this.filteredSubCompanyProfilesSource.asObservable();
    updateFilteredSubCompanyProfiles(filteredProfiles: SubCompanyProfile[]) {
        this.filteredSubCompanyProfilesSource.next(filteredProfiles);
    }

    private unsubscribe: Subscription[] = [];
    currentUserSubject: BehaviorSubject<CompanyModel | undefined>;
    currentUser$: Observable<CompanyModel | undefined>;

    get currentUserValue(): CompanyModel | undefined {
        return this.currentUserSubject.value;
    }

    set currentUserValue(user: CompanyModel | undefined) {
        this.currentUserSubject.next(user);
    }

    // currentBranchSubject: BehaviorSubject<SubCompanyDTO | undefined>;
    // currentBranch$: Observable<SubCompanyDTO | undefined>;



    constructor(private httpClient: HttpClient, private loaderService: LoaderService) {
        this.currentUserSubject = new BehaviorSubject<CompanyModel | undefined>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        const subscr = this.getCompany().subscribe();
        this.unsubscribe.push(subscr);

    }

    getCompany(): Observable<CompanyModel> {
        this.loaderService.start()
        return this.httpClient.get<CompanyModel>('/Company/company').pipe(
            map((user: CompanyModel) => {
                if (user) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }),
            finalize(() => this.loaderService.stop())
        );
    }

    getSubCompany(): Observable<SubCompanyDTO[] | []> {
        this.loaderService.start()
        return this.httpClient.get<SubCompanyDTO[]>('/Company/subcompany').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    getEvent(): Observable<EventDTO[] | []> {
        this.loaderService.start()
        return this.httpClient.get<EventDTO[]>('/Company/event').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    getEventItem(): Observable<Array<EventItemDTO>> {
        this.loaderService.start()
        return this.httpClient.get<Array<EventItemDTO>>('/Company/eventitem').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    getWorkTime(): Observable<Array<WorkTimeDTO>> {
        this.loaderService.start()
        return this.httpClient.get<Array<WorkTimeDTO>>('/Company/worktime').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    getPosition(): Observable<Array<PositionDTO>> {
        this.loaderService.start()
        return this.httpClient.get<Array<PositionDTO>>('/Company/position').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    getPositionGroup() : Observable<Array<DropDownDTO>> {
        this.loaderService.start()
        return this.httpClient.get<Array<DropDownDTO>>('/Company/positionGroup').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    postSubCompany(subCompany : Item): Observable<any> {
        this.loaderService.start()
        return this.httpClient.post('/Company/postSubCompany',subCompany).pipe(
            finalize(()=> this.loaderService.stop())
        )
    }

    postEvent(params : any) : Observable<any> {

        this.loaderService.start()
        return this.httpClient.post('/Company/postEvent',params).pipe(
            finalize(() => this.loaderService.stop())
        )
    }

    postCompany(company : any) : Observable<any> {
        this.loaderService.start()
        return this.httpClient.post('/Company/postCompany',company).pipe(
            finalize(() => this.loaderService.stop())
        )
    }
}
