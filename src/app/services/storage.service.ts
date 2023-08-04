import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { AccessTokenModel } from "../models/access-token.model";
import { UserProfileModel } from "../models/user-profile.model";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERTOKEN_KEY}`;
  private authLocalStorageProfile = `${environment.appVersion}-${environment.USERPROFILE_KEY}`;

  public setAccessToken(auth: AccessTokenModel): boolean {
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  public setUserProfile(profile: UserProfileModel): boolean {
    if (profile) {
      localStorage.setItem(this.authLocalStorageProfile, JSON.stringify(profile));
      return true;
    }
    return false;
  }

  public getAccessToken(): AccessTokenModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }
      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public clearAll(){
    localStorage.clear();
  }



}
