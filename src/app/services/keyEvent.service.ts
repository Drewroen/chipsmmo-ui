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
import { MovementService } from './movement.service';
import { UserSettings } from 'src/objects/userSettings';
import { LoginService } from './login.service';

@Injectable()
export class KeyEventService {
  constructor(private appStates: AppStates, private movementService: MovementService, private userSettings: UserSettings, private loginService: LoginService)
  {
  }

  public handleKeyPress(event: KeyboardEvent)
  {
    if (event.type === 'keyup')
    {
      if (this.appStates.menuState === MenuState.Playing)
        this.movementService.handleKeyUp(event.key);
    }
    else if (event.type === 'keydown') {
      if (this.userSettings.getCurrentKeyBeingSet())
      {
        this.setControl(this.userSettings.getCurrentKeyBeingSet(), event.key);
        localStorage.setItem('user_settings', JSON.stringify(this.userSettings));
        this.userSettings.setCurrentKeyBeingSet(null);
      }
      if (this.appStates.menuState === MenuState.Playing)
        this.movementService.handleKeyDown(event.key);
      if (event.key === Constants.DEFAULT_KEY_ENTER) {
        switch (this.appStates.menuState) {
          case MenuState.Login: this.loginService.logIntoAccount(); break;
          case MenuState.Menu: this.appStates.playGame(); break;
          case MenuState.CreateAccount: this.loginService.createAccount(); break;
          default: break;
        }
      }
    }
  }

  private setControl(key: string, value: string) {
    const currentControls = this.userSettings.controls;
    if (value !== currentControls.up &&
      value !== currentControls.down &&
      value !== currentControls.left &&
      value !== currentControls.right &&
      value !== currentControls.throwBowlingBall &&
      value !== currentControls.callWhistle)
    {
      switch(key)
      {
        case 'Up': this.userSettings.controls.up = value; break;
        case 'Down': this.userSettings.controls.down = value; break;
        case 'Left': this.userSettings.controls.left = value; break;
        case 'Right': this.userSettings.controls.right = value; break;
        case 'Throw Bowling Ball': this.userSettings.controls.throwBowlingBall = value; break;
        case 'Call Whistle': this.userSettings.controls.callWhistle = value; break;
      }
    }
  }
}
