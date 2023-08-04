import { AccessTokenModel } from './access-token.model';

export class UserProfileModel extends AccessTokenModel {
  id: string;
  email: string;
  pictureUrl: string;
  firstnameTH: string;
  lastnameTH: string;
  firstnameEng: string;
  lastnameEng: string;
  nickname : string;
  gender : string;
  dateOfBirth : Date;
  phone : string;
  line : string;
  zipcode : string;
  province : string;
  district : string;
  subDistrict : string;
  addressDescription : string;
  provinceId : string;
  districtId : string;
  subdistrictId : string;
  accountId : string;


  // roles: number[] = [];
  // language: string;

  constructor() {
    super();
    this.id = '';
    this.email =  '';
    // ./assets/media/avatars/blank.png
    this.pictureUrl = '';
    this.firstnameTH = '';
    this.lastnameTH = '';
    this.firstnameEng = '';
    this.lastnameEng = '';
    this.nickname = '';
    this.gender = '';
    // this.dateOfBirth = '';
    this.phone = '';
    this.line = '';
    this.zipcode = '';
    this.province = '';
    this.district = '';
    this.subDistrict =  '';
    this.addressDescription =  '';
    this.provinceId =  '';
    this.districtId =  '';
    this.subdistrictId =  '';
    this.accountId =  '';


    // this.roles = user.roles || [];
  }
}
