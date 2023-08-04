import { ObjectState } from "../services/state.enum";

export class UserAttachModel {
  id : string ;
  type : string ;
  name : string ;
  path : string ;
  externalPath : string ;
  objectState: ObjectState;

  constructor() {
    this.type = '';
    this.name =  '';
    this.path = '';
    this.externalPath = '';
    this.objectState = ObjectState.Added;

  }
}