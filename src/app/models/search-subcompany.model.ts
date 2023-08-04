export class SubCompanyDTO {
    pictureUrl : string;
    subCompanyId: string;
    subCompanyName: string;
    email : string;
    facebook : string;
    lineId : string;
    zipcode: string;
    phone: string;
    addressDescription: string;
    provinceName: string;
    subdistrictName: string;
    districtName: string;
    provinceId: string;
    subdistrictId: string;
    districtId: string;
    companyId: string;
    active: boolean;

    constructor() {
        this.subCompanyName = '';
    }
}   