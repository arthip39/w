export class EventDTO {
    eventId: string;
    eventName: string;
    eventProperty: string;
    hardskillRequirement: string;
    softskillRequirement: string;
    jobDescription: string;
    scholarship: number;
    rewardWelfare: string;
    laptop: boolean;
    worktimeId: string;
    subCompanyId: string;
    active: boolean;
    createdDateTime : string;
    dueDateString : string;

    constructor() {
        this.eventName = 'รับสมัครคนเตนบั้นเด้า';
        this.eventProperty = '- เต้นได้จนเอวหลุด';
        this.hardskillRequirement = 'rap เอก ได้';
        this.softskillRequirement = 'อายุต่ำกว่า 18';
        this.jobDescription = '-';
        this.rewardWelfare = 'มีประกัน';
        this.scholarship = 300;
        this.createdDateTime = '';
        this.laptop = false;
        this.subCompanyId = '';
        this.dueDateString = '';
    }
}