import { ObjectState } from "../services/state.enum";

export class UserEducationModel  {
  id : string;
  faculty : string;
  gpa : string;
  degreeName : string;
  academyName : string;
  degreeId : string;
  academyId : string;
  objectState: ObjectState;

  constructor() {
    this.faculty = '';
    this.gpa = '';
    this.degreeName = ''
    this.academyName = '';
    this.degreeId = ''
    this.academyId = '';
    this.objectState = ObjectState.Added;
    
  }
}