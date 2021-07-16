import { SocketIOService } from './socketio.service';
import { Injectable } from '@angular/core';
import { Constants } from './../../constants/constants';
import { UserSettings } from 'src/objects/userSettings';

@Injectable()
export class MovementService {
  private socketService: SocketIOService;
  private userSettings: UserSettings;

  constructor(socketService: SocketIOService, userSettings: UserSettings) {
    this.socketService = socketService;
    this.userSettings = userSettings;
  }

  handleKeyDown(key: string): void {
    if (key === this.userSettings.controls.up)
      this.sendKeyDown(Constants.DIRECTION_UP);
    else if (key === this.userSettings.controls.down)
      this.sendKeyDown(Constants.DIRECTION_DOWN);
    else if (key === this.userSettings.controls.right)
      this.sendKeyDown(Constants.DIRECTION_RIGHT);
    else if (key === this.userSettings.controls.left)
      this.sendKeyDown(Constants.DIRECTION_LEFT);
    else if (key === this.userSettings.controls.throwBowlingBall)
      this.sendKeyDown(Constants.THROW_BOWLING_BALL);
    else if (key === this.userSettings.controls.callWhistle)
      this.sendKeyDown(Constants.CALL_WHISTLE);
  }

  handleKeyUp(key: string): void {
    if (key === this.userSettings.controls.up)
      this.sendKeyUp(Constants.DIRECTION_UP);
    else if (key === this.userSettings.controls.down)
      this.sendKeyUp(Constants.DIRECTION_DOWN);
    else if (key === this.userSettings.controls.right)
      this.sendKeyUp(Constants.DIRECTION_RIGHT);
    else if (key === this.userSettings.controls.left)
      this.sendKeyUp(Constants.DIRECTION_LEFT);
  }

  sendKeyDown(key: number): void {
    this.socketService.sendData(Constants.SOCKET_EVENT_KEYDOWN, key)
  }

  sendKeyUp(key: number): void {
    this.socketService.sendData(Constants.SOCKET_EVENT_KEYUP, key)
  }
}
