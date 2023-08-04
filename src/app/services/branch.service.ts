import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";
import { BehaviorSubject, Observable, Subscription, finalize } from "rxjs";
import { SubCompanyDTO } from "../models/search-subcompany.model";
import { EventDTO } from "../models/event.model";
import { ActivatedRoute } from "@angular/router";
import { TeamDTO } from "../models/team.model";
import { TeamMemberDTO } from "../models/team-members.model";

@Injectable({
    providedIn: 'root',
})
export class BranchService {

    private unsubscribe: Subscription[] = [];
    currentBranchSubject : BehaviorSubject<SubCompanyDTO | undefined>;
    currentBranch$ : Observable<SubCompanyDTO | undefined>;

    get currentBranchValue(): SubCompanyDTO | undefined {
        return this.currentBranchSubject.value;
    }

    set currentBranchValue(branch: SubCompanyDTO | undefined) {
        // debugger
        this.currentBranchSubject.next(branch);
    }

    constructor(private httpClient: HttpClient, private loaderService: LoaderService , private route: ActivatedRoute) {
        this.currentBranchSubject = new BehaviorSubject<SubCompanyDTO | undefined>(undefined);
        this.currentBranch$ = this.currentBranchSubject.asObservable();
        // const subscr = this.findBranch(this.id).subscribe();
        // this.unsubscribe.push(subscr);
        // this.findBranch
    }

    findBranch(id:string) {
        this.getSubCompany().subscribe(data => {
            const filter = data.find(sub => sub.subCompanyId === id)
            this.currentBranchSubject.next(filter)
        })
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

    getTeam() : Observable<TeamDTO[] | []> {
        this.loaderService.start()
        return this.httpClient.get<TeamDTO[]>('/Teams/team').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    getMember() : Observable<TeamMemberDTO[] | []> {
        this.loaderService.start()
        return this.httpClient.get<TeamMemberDTO[]>('/Teams/member').pipe(
            finalize(() => this.loaderService.stop())
        );
    }

    postBranch(subComany : any) : Observable<SubCompanyDTO | undefined> {
        this.loaderService.start()
        return this.httpClient.post<SubCompanyDTO | undefined>('/Company/postBranch',subComany).pipe(
            finalize(() => this.loaderService.stop())
        );
    }

}