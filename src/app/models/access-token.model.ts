export class AccessTokenModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  refreshExpiryIn: Date;


  setAuth(auth: AccessTokenModel) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.refreshExpiryIn = auth.refreshExpiryIn;
  }
}
