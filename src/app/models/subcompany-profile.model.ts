export class SubCompanyProfile {
    //SubCompany
    subCompanyId: string;
    subCompanyName: string;
    zipcode: string;
    phone: string;
    addressDescription: string;
    subdistrictId: string;
    companyId: string;
    districtId: string;
    //Province
    provinceId: string;
    label: string;
    //Event
    eventId: string;
    eventName: string;
    eventProperty: string;
    hardskill_requirement: string;
    softskill_requirement: string;
    jobDescription: string;
    scholarship: number;
    rewardWelfare: string;
    laptop: boolean;
    //EventItem
    eventItemId: string;
    positionNumber: number;
    //Position
    positionId: string;
    groupId: string;
    code: string;
    positionName: string;
    //WorkTime
    WorktimeId: string;
    InWorkDay: string;
    OutWorkDay: string;
    WorkStartTime: Date | null;
    WorkEndTime: Date | null;
}