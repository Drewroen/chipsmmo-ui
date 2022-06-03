import { UserInfo } from '../objects/userInfo';
import { SocketIOService } from './services/socketio.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Forms } from 'src/objects/forms';
import { Graphics } from 'src/objects/graphics/graphics';
import { GameInformation } from 'src/objects/gameInformation';
import { GameState, LoginState, MenuState } from 'src/constants/states';
import { UserSettings } from 'src/objects/userSettings';
import { AppStates } from 'src/objects/appStates';
import { LoginService } from './services/login.service';
import { KeyEventService } from './services/keyEvent.service';
import { PixiApp } from 'src/objects/pixiApp';
import { AppSubscriptions } from 'src/objects/appSubscriptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public MenuStates = MenuState;
  public LoginStates = LoginState;
  public GameStates = GameState;

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.keyEventService.handleKeyPress(event);
  }

  constructor(public socketService: SocketIOService,
    private keyEventService: KeyEventService,
    private pixiApp: PixiApp,
    public loginService: LoginService,
    public userSettings: UserSettings,
    public userInfo: UserInfo,
    public appStates: AppStates,
    public graphics: Graphics,
    public forms: Forms,
    public gameInformation: GameInformation,
    public appSubscriptions: AppSubscriptions) {
  }

  async ngOnInit() {
    if (localStorage.getItem("refresh_token"))
      await this.loginService.loginWithExistingToken();

    document.getElementById('map').appendChild(this.pixiApp.app.view);
  }
}
