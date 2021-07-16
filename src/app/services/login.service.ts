import { environment } from '../../environments/environment';
import { UserInfo } from "../../objects/userInfo";
import { Token } from "../../objects/token";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { AppStates } from 'src/objects/appStates';
import { LoginState, MenuState } from 'src/constants/states';
import { SocketIOService } from './socketio.service';
import { Constants } from 'src/constants/constants';
import { Forms } from 'src/objects/forms';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService, private appStates: AppStates, private userInfo: UserInfo, private socketService: SocketIOService, private forms: Forms)
  {
    this.userInfo = userInfo;
  }

  public async loginWithExistingToken()
  {
    this.appStates.menuState = MenuState.Loading;
    if (localStorage.getItem('refresh_token') !== null) {

      try {
        var newAccessToken: Token = await this.authService.getNewAccessToken();
        localStorage.setItem("access_token", newAccessToken.accessToken);
        this.appStates.loginState = LoginState.LoggedIn;
        this.userInfo.setUserInfo(await this.authService.getInfo());
        this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, newAccessToken.accessToken);
        this.appStates.menuState = MenuState.Menu;
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.appStates.loginState = LoginState.LoggedOut;
        this.appStates.menuState = MenuState.Menu;
        this.userInfo.setUserInfo(null);
      }
    }
    else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.appStates.loginState = LoginState.LoggedOut;
      this.appStates.menuState = MenuState.Menu;
      this.userInfo.setUserInfo(null);
    }
  }

  public async logout() {
    this.appStates.menuState = MenuState.Loading;
    try {
      await this.authService.logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.appStates.loginState = LoginState.LoggedOut;
      this.appStates.menuState = MenuState.Menu;
      this.userInfo.setUserInfo(null);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.appStates.loginState = LoginState.LoggedOut;
      this.appStates.menuState = MenuState.Menu;
      this.userInfo.setUserInfo(null);
    };
  }

  public async logIntoAccount() {
    if (this.forms.loginForm.valid) {
      let username = this.forms.loginForm.controls['username'].value;
      let password = this.forms.loginForm.controls['password'].value;

      this.appStates.menuState = MenuState.Loading;
      try {
        let token: Token = await this.authService.login(username, password);
        localStorage.setItem("access_token", token.accessToken);
        localStorage.setItem("refresh_token", token.refreshToken);
        this.appStates.loginState = LoginState.LoggedIn;
        try {
          this.userInfo.setUserInfo(await this.authService.getInfo());
        } catch {}
        this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, localStorage.getItem("access_token"));
        this.appStates.menuState = MenuState.Menu;
      } catch {
        this.appStates.loginState = LoginState.Failed;
        this.appStates.menuState = MenuState.Login;
        this.userInfo.setUserInfo(null);
      };
    }
  }

  public async createAccount()
  {
    if (this.forms.createAccountForm.valid) {
      let username = this.forms.createAccountForm.controls['username'].value;
      let password = this.forms.createAccountForm.controls['password'].value;
      let email = this.forms.createAccountForm.controls['email'].value;

      this.appStates.menuState = MenuState.Loading;
      try {
        await this.authService.createAccount(username, password, email);
        this.forms.loginForm.controls['username'].setValue(username);
        this.forms.loginForm.controls['password'].setValue(password);
        this.logIntoAccount();
      } catch {
        this.appStates.loginState = LoginState.Failed;
        this.appStates.menuState = MenuState.CreateAccount;
        this.userInfo.setUserInfo(null);
      }
    }
  }
}
