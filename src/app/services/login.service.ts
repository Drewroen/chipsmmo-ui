import { UserInfo } from "../../objects/userInfo";
import { Token } from "../../objects/token";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { AppStateService } from 'src/objects/appStateService';
import { LoginState, MenuState } from 'src/constants/states';
import { SocketIOService } from './socketio.service';
import { Constants } from 'src/constants/constants';
import { Forms } from 'src/objects/forms';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService, private appStateService: AppStateService, private userInfo: UserInfo, private socketService: SocketIOService, private forms: Forms)
  {
    this.userInfo = userInfo;
  }

  public async loginWithExistingToken()
  {
    this.appStateService.menuState = MenuState.Loading;
    if (localStorage.getItem('refresh_token') !== null) {

      try {
        var newAccessToken: Token = await this.authService.getNewAccessToken();
        localStorage.setItem("access_token", newAccessToken.accessToken);
        this.appStateService.loginState = LoginState.LoggedIn;
        this.userInfo.setUserInfo(await this.authService.getInfo());
        this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, newAccessToken.accessToken);
        this.appStateService.menuState = MenuState.Menu;
      } catch {
        this.socketService.sendData(Constants.SOCKET_EVENT_LOGOUT, localStorage.getItem("access_token"));
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.appStateService.loginState = LoginState.LoggedOut;
        this.appStateService.menuState = MenuState.Menu;
        this.userInfo.resetUserInfo();
      }
    }
    else {
      this.socketService.sendData(Constants.SOCKET_EVENT_LOGOUT, localStorage.getItem("access_token"));
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.appStateService.loginState = LoginState.LoggedOut;
      this.appStateService.menuState = MenuState.Menu;
      this.userInfo.resetUserInfo();
    }
  }

  public async logout() {
    this.appStateService.menuState = MenuState.Loading;
    try {
      await this.authService.logout();
      this.socketService.sendData(Constants.SOCKET_EVENT_LOGOUT, localStorage.getItem("access_token"));
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.appStateService.loginState = LoginState.LoggedOut;
      this.appStateService.menuState = MenuState.Menu;
      this.userInfo.resetUserInfo();
    } catch {
      this.socketService.sendData(Constants.SOCKET_EVENT_LOGOUT, localStorage.getItem("access_token"));
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.appStateService.loginState = LoginState.LoggedOut;
      this.appStateService.menuState = MenuState.Menu;
      this.userInfo.resetUserInfo();
    };
  }

  public async logIntoAccount() {
    if (this.forms.loginForm.valid) {
      let username = this.forms.loginForm.controls['username'].value;
      let password = this.forms.loginForm.controls['password'].value;

      this.appStateService.menuState = MenuState.Loading;
      try {
        let token: Token = await this.authService.login(username, password);
        localStorage.setItem("access_token", token.accessToken);
        localStorage.setItem("refresh_token", token.refreshToken);
        this.appStateService.loginState = LoginState.LoggedIn;
        try {
          this.userInfo.setUserInfo(await this.authService.getInfo());
        } catch {}
        this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, localStorage.getItem("access_token"));
        this.appStateService.menuState = MenuState.Menu;
      } catch {
        this.appStateService.loginState = LoginState.Failed;
        this.appStateService.menuState = MenuState.Login;
        this.userInfo.resetUserInfo();
      };
    }
  }

  public async createAccount()
  {
    if (this.forms.createAccountForm.valid) {
      let username = this.forms.createAccountForm.controls['username'].value;
      let password = this.forms.createAccountForm.controls['password'].value;
      let email = this.forms.createAccountForm.controls['email'].value;

      this.appStateService.menuState = MenuState.Loading;
      try {
        await this.authService.createAccount(username, password, email);
        this.forms.loginForm.controls['username'].setValue(username);
        this.forms.loginForm.controls['password'].setValue(password);
        this.logIntoAccount();
      } catch {
        this.appStateService.loginState = LoginState.Failed;
        this.appStateService.menuState = MenuState.CreateAccount;
        this.userInfo.resetUserInfo();
      }
    }
  }
}
