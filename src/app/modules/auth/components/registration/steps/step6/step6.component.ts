import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  FileRestrictions,
  SelectEvent,
  RemoveEvent,
  ErrorEvent,
  CancelEvent,
  PauseEvent,
  ResumeEvent,
  SuccessEvent,
  UploadEvent,
  UploadProgressEvent,
  ChunkSettings,
  FileInfo
} from "@progress/kendo-angular-upload";
import { IRegistrationForm } from '../../registration.interface';



@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
})
export class Step6Component implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegistrationForm>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegistrationForm>;
  MAX_LINK_URL = 4;

  myFile : Array<FileInfo> = [] ;
  link : Link[] = [];

  Url_pattern= /^(https?:\/\/)?[a-z0-9\-\.]+\.[a-z]{2,}(\/.*)?$/;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder ) { }

  ngOnInit() {

    this.myFile = this.defaultValues.myFiles || [] ;
    this.link = this.defaultValues.links || [new Link()];
    this.updateParentModel({}, this.checkForm());

  }

  onChangeFile() {
    this.updateParentModel({myFiles: this.myFile}, this.checkForm())
  }

  onChangeLink() {
    this.updateParentModel({links: this.link}, this.checkForm())
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  checkForm() {
    return (
      // true
      this.myFile && 
      this.myFile.length > 0 &&
      this.link.every(x=> this.Url_pattern.test(x.url))

    );
  }

  public myRestrictions: FileRestrictions = {
    maxFileSize: 5000000,
  };

  addNewLink() { 
    if (this.link.length < this.MAX_LINK_URL) {
      this.link.push(new Link());
      this.onChangeLink();
    }
    
  }

  removeLink(i : any) {
    this.link.splice(i,1);
    this.onChangeLink()
  }
  
  SaveUrl = "saveUrl"; // should represent an actual API endpoint
  RemoveUrl = "removeUrl"; // should represent an actual API endpoint
  
}

export class Link {
  url : string = '';
}