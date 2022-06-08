import { Injectable } from '@angular/core';
import { SocketIOService } from 'src/app/services/socketio.service';
import { Constants } from 'src/constants/constants';
import { GameState, LoginState, MenuState } from 'src/constants/states';
import { UserInfo } from './userInfo';

@Injectable()
export class AppStateService {
  menuState: MenuState;
  loginState: LoginState;
  gameState: GameState;

  constructor(private socketService: SocketIOService, private userInfo: UserInfo)
  {
    this.menuState = MenuState.Menu;
    this.loginState = LoginState.LoggedOut;
    this.gameState = GameState.Starting;
  }

  playGame(): void {
    this.menuState = MenuState.Playing;
    this.socketService.sendData(Constants.SOCKET_EVENT_START, this.loginState == LoginState.LoggedIn ? this.userInfo.username : "Chip");
  }

  goToLogin(): void {
    this.menuState = MenuState.Login;
  }

  goToLobbies(): void {
    this.menuState = MenuState.Lobbies;
  }

  goToSettings(): void {
    this.menuState = MenuState.Settings;
  }

  goToCreateAccount(): void {
    if(this.loginState != LoginState.LoggedIn)
      this.menuState = MenuState.CreateAccount;
  }

  goToMenu(): void {
    this.menuState = MenuState.Menu;
  }

  centerPanelShouldShow(): boolean {
    return this.menuState === MenuState.Menu ||
      this.menuState === MenuState.CreateAccount ||
      this.menuState === MenuState.Loading ||
      this.menuState === MenuState.Lobbies ||
      this.menuState === MenuState.Login ||
      (this.menuState === MenuState.Respawning && this.gameState !== GameState.Finished) ||
      this.menuState === MenuState.Settings ||
      (this.menuState === MenuState.Playing && this.gameState === GameState.Starting);
  }

  centerFooterPanelShouldShow(): boolean {
    return this.menuState === MenuState.Menu ||
      this.menuState === MenuState.CreateAccount ||
      this.menuState === MenuState.Loading ||
      this.menuState === MenuState.Lobbies ||
      this.menuState === MenuState.Settings ||
      this.menuState === MenuState.Login;
  }
}
