
import { Education } from "../auth/components/registration/steps/step4/step4.component";
import { FileInfo } from "@progress/kendo-angular-upload";
import { Link } from "../auth/components/registration/steps/step6/step6.component";


interface ICreateAccount {
  //
  educations : Array<Education>;
  myFiles : Array<FileInfo>;
  links : Array<Link>;

//
  photoprofile : string;
  accountType: 'personal' | 'corporate';
  accountTeamSize: '1-1' | '2-10' | '10-50' | '50+';
  firstNameTH : string;
  lastNameTH : string;
  firstNameEng : string;
  lastNameEng : string;
  nickName : string;
  gender : string;
  dateOfBrith : string;
  phoneNumber : string;
  lineAccountId : string;
  accountName: string;
  accountPlan: '1' | '2' | '3';
  businessName: string;
  businessDescriptor: string;
  businessType: '1' | '2' | '3' | '4' | '5' | '6';
  businessDescription: string;
  businessEmail: string; 
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;


  degree : string;
  academy : string;
  faculty : string;
  gpa : string;
  languageskill: string;
}

const inits: ICreateAccount = {
  educations:[],
  myFiles:[],
  links:[],
  photoprofile : '',
  accountType: 'personal',
  accountTeamSize: '50+',
  accountName: 'team',
  accountPlan: '1',
  businessName: 'Keenthemes Inc.',
  businessDescriptor: 'KEENTHEMES',
  businessType: '1',
  businessDescription: '',
  businessEmail: 'corp@support.com',
  nameOnCard: 'Max Doe',
  cardNumber: '4111 1111 1111 1111',
  cardExpiryMonth: '0',
  cardExpiryYear: '2',
  cardCvv: '123',
  saveCard: '1',
  firstNameTH : '',
  lastNameTH : '',
  firstNameEng : '',
  lastNameEng : '',
  nickName : '',
  gender : '',
  dateOfBrith :  '',
  phoneNumber : '',
  lineAccountId : '',

  degree : '',
  academy : '',
  faculty : '',
  gpa : '',
  languageskill: 'ภาษาอังกฤษ'
};

export { ICreateAccount, inits };
