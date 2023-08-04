import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ListCompanyService } from 'src/app/services/listcompany.service';
import { ProvinceService } from 'src/app/services/province.service';
import { DropDownDTO } from 'src/app/models/drop-down.model';
import { PositionDTO } from 'src/app/models/position.model';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { EventItemDTO } from 'src/app/models/eventitem.model';
import { EventDTO } from 'src/app/models/event.model';
import { WorkTimeDTO } from 'src/app/models/workTime.model';
import { SubCompanyProfile } from 'src/app/models/subcompany-profile.model';
import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  @ViewChild('positionSelect', { static: true }) positionSelect!: MultiSelectComponent;
  @ViewChild('provinceSelect', { static: true }) provinceSelect!: MultiSelectComponent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  saveDisable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveDisable: boolean;


  lsProvince: DropDownDTO[] = [];
  lsPosition: PositionDTO[] = [];
  lsSubCompany: SubCompanyDTO[] = [];
  lsWorkTime: WorkTimeDTO[] = [];
  lsEvent: EventDTO[] = [];
  lsEventItem: EventItemDTO[] = [];

  subcompanyProfile: SubCompanyProfile[] = [];
  originalSubcompanyProfile: SubCompanyProfile[] = [];


  public positionTag(tags: any[]): any[] {
    return tags.length < 2 ? tags : [tags];
  }
  public proviceTag(tags: any[]): any[] {
    return tags.length < 4 ? tags : [tags];
  }

  constructor(
    private provinceService: ProvinceService,
    private listCompanyService: ListCompanyService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    forkJoin([
      this.provinceService.getProvince(),
      this.listCompanyService.getSubCompany(),
      this.listCompanyService.getPosition(),
      this.listCompanyService.getEvent(),
      this.listCompanyService.getEventItem(),
      this.listCompanyService.getWorkTime()
    ]).subscribe(([provinces, subCompanies, positions, events, eventItems, workTimes]) => {
      this.lsProvince = provinces;
      this.lsSubCompany = subCompanies;
      this.lsPosition = positions;
      this.lsEvent = events;
      this.lsEventItem = eventItems;
      this.lsWorkTime = workTimes;
      this.mergeCompanyProfile();
    });
  }

  findjob() {
    const selectedPositionObjects = this.positionSelect.value;
    const selectedProvinceObjects = this.provinceSelect.value;

    const selectedPositionIds = selectedPositionObjects.map(position => position.positionId);
    const selectedProvinceIds = selectedProvinceObjects.map(province => province.value);

    if (selectedPositionIds.length === 0 && selectedProvinceIds.length === 0) {
      // If neither position nor province is selected, show all companies
      this.subcompanyProfile = this.originalSubcompanyProfile;
    } else if (selectedPositionIds.length === 0) {
      // If only province is selected, show companies that match the selected provinces
      this.subcompanyProfile = this.originalSubcompanyProfile.filter(subCompany => {
        return selectedProvinceIds.includes(subCompany.provinceId);
      });
    } else if (selectedProvinceIds.length === 0) {
      // If only position is selected, show companies that match the selected positions
      this.subcompanyProfile = this.originalSubcompanyProfile.filter(subCompany => {
        return selectedPositionIds.includes(subCompany.positionId);
      });
    } else {
      // If both position and province are selected, show companies that match both
      this.subcompanyProfile = this.originalSubcompanyProfile.filter(subCompany => {
        return selectedPositionIds.includes(subCompany.positionId) && selectedProvinceIds.includes(subCompany.provinceId);
      });
    }

    const filteredProfiles: SubCompanyProfile[] = this.subcompanyProfile
    this.listCompanyService.updateFilteredSubCompanyProfiles(filteredProfiles);
  }



  mergeCompanyProfile() {
    this.subcompanyProfile = this.lsSubCompany.map((subcompany) => {
      const province = this.lsProvince.find((province) => province.value === subcompany?.provinceId);
      const event = this.lsEvent.find((event) => event.subCompanyId === subcompany?.subCompanyId);
      const workTime = this.lsWorkTime.find((worktime) => worktime.worktimeId === event?.worktimeId);
      const eventItem = this.lsEventItem.find((eventitem) => eventitem.eventId === event?.eventId);
      const position = this.lsPosition.find((position) => position.positionId === eventItem?.positionId);
      return {
        //subcompany
        subCompanyId: subcompany.subCompanyId,
        subCompanyName: subcompany.subCompanyName,
        zipcode: subcompany.zipcode,
        phone: subcompany.phone,
        addressDescription: subcompany.addressDescription,
        subdistrictId: subcompany.subdistrictId,
        districtId: subcompany.districtId,
        companyId: subcompany.companyId,
        //province
        provinceId: province?.value || '',
        label: province?.label || '',
        //event
        eventId: event?.eventId || '',
        eventName: event?.eventName || '',
        eventProperty: event?.eventProperty || '',
        hardskill_requirement: event?.hardskillRequirement || '',
        softskill_requirement: event?.softskillRequirement || '',
        jobDescription: event?.jobDescription || '',
        scholarship: event?.scholarship || 0,
        rewardWelfare: event?.rewardWelfare || '',
        laptop: event?.laptop || false,
        //eventitem
        eventItemId: eventItem?.eventItemId || '',
        positionNumber: eventItem?.positionNumber || 0,

        //position
        positionId: position?.positionId || '',
        positionName: position?.positionName || '',
        code: position?.code || '',
        groupId: position?.groupId || '',
        //worktime
        WorktimeId: workTime?.worktimeId || '',
        InWorkDay: workTime?.inWorkDay || '',
        OutWorkDay: workTime?.outWorkDay || '',
        WorkStartTime: workTime?.workStartTime || null,
        WorkEndTime: workTime?.workEndTime || null
      };
    }
    ); this.originalSubcompanyProfile = [...this.subcompanyProfile];
  }
}