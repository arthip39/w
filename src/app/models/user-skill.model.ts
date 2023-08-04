import { ObjectState } from "../services/state.enum";

export class UserSkillModel {
  id : string ;
  name : string ;
  score : string ;
  group : string ;
  objectState: ObjectState;

  constructor() {
    this.name =  '';
    this.score = '';
    this.group = '';
    this.objectState = ObjectState.Added;

  }
}