
import { Education } from "./steps/step4/step4.component";
import { Language, Skill } from "./steps/step5/step5.component";
import { FileInfo } from "@progress/kendo-angular-upload";
import { Link } from "./steps/step6/step6.component";

interface IRegistrationForm {
    //step1
    Email: string;
    Password: string;
    ConfirmPassword: string;
    //step2
    Photoprofile?: string;
    firstNameTH: string;
    lastNameTH: string;
    firstNameEng: string;
    lastNameEng: string;
    nickName: string;
    gender: string;
    DateOfBirth?: Date;
    phoneNumber: string;
    lineAccountId: string;
    //step3
    SubDistrict?: string;
    District?: string;
    Province?: string;
    Zipcode: string;
    AddressDescription: string;
    //step4
    Education: Array<Education>;
    //step5
    language: Array<Language>;
    skill: Array<Skill>;
    //step6
    myFiles: Array<FileInfo>;
    links: Array<Link>;




}

const inits: IRegistrationForm = {
    //step1
    Email: '',
    Password: '',
    ConfirmPassword: '',
    //step2
    Photoprofile: '',
    firstNameTH: '',
    lastNameTH: '',
    firstNameEng: '',
    lastNameEng: '',
    nickName: '',
    gender: '',
    // dateOfBrith: '02/11/',
    phoneNumber: '',
    lineAccountId: '',
    //step3
    SubDistrict: '',
    District: '',
    Province: '',
    Zipcode: '',
    AddressDescription: '',
    //step4
    Education:[
        {
            degree : '',
            academy : '',
            faculty : '',
            gpa : undefined,
        }
    ],
    //step5
    language: [
        {
            languageName: '',
            languageScore: '',
            languageGroup: '',
        }
    ],
    skill: [
        {
            skillName: '',
            skillScore: '',
            skillGroup: '',
        }
    ],
    //step6
    myFiles: [],
    links: []




};

export { IRegistrationForm, inits };
