import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { SocketIOService } from 'src/app/services/socketio.service';
import { Constants } from 'src/constants/constants';
import { GameState } from 'src/constants/states';
import { AppStates } from './appStates';
import { EloResult } from './eloResult';
import { GameInformation } from './gameInformation';
import { Graphics } from './graphics/graphics';
import { Player } from './player';

export declare var PIXI: any;

@Injectable()
export class AppSubscriptions {
  public roomCountSub: Subscription;
  public currentRoomSub: Subscription;
  public gameMapSub: Subscription;
  public multiLoginSub: Subscription;
  public eloSub: Subscription;

  constructor(private socketService: SocketIOService, private gameInformation: GameInformation, private appStates: AppStates, private loginService: LoginService)
  {
    this.gameMapSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_GAME_MAP_FULL)
    .subscribe((dataString: any) => {
      const data = JSON.parse(dataString);
      if (data.mobs)
        this.gameInformation.map.mobs = data.mobs;
      if (data.terrain)
        this.gameInformation.map.terrain = data.terrain;
      if (data.object)
        this.gameInformation.map.objects = data.object;
      if (data.gameStatus !== undefined) {
        this.gameInformation.status = data.gameStatus;
      }
      if (data.players && this.gameInformation.status !== Constants.GAME_STATUS_FINISHED)
        this.gameInformation.players = (data.players as Player[]).sort((a, b) => (a.score < b.score) ? 1 : -1);;
      if (data.time)
        this.gameInformation.time = data.time;

      if (this.gameInformation.map.mobs && this.gameInformation.map.terrain && this.gameInformation.map.objects && this.gameInformation.players) {
        this.gameInformation.updateMap();
        this.gameInformation.updatePlayerInfo();
        this.gameInformation.updateScoreboard();

        var previousGameState = this.appStates.gameState
        this.gameInformation.updateGameInfo();
        if (this.appStates.gameState == GameState.Finished)
          this.gameInformation.updateEndGameInfo();
        else
        {
          this.gameInformation.resetEndGameInfo();
          if (previousGameState === GameState.Finished)
            this.appStates.goToMenu();
        }
      }
    });

  this.gameMapSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_GAME_MAP_DELTA)
    .subscribe((dataString: any) => {
      const data = JSON.parse(dataString);

      if (data.mobs)
        this.gameInformation.updateMobs(data.mobs);
      if (data.terrain)
        this.gameInformation.updateTerrain(data.terrain);
      if (data.object)
        this.gameInformation.updateObjects(data.object);
      if (data.gameStatus !== undefined) {
        this.gameInformation.status = data.gameStatus;
      }
      if (data.players && this.gameInformation.status !== Constants.GAME_STATUS_FINISHED)
        this.gameInformation.players = (data.players as Player[]).sort((a, b) => (a.score < b.score) ? 1 : -1);;
      if (data.time)
        this.gameInformation.time = data.time;

      if (this.gameInformation.map.mobs && this.gameInformation.map.terrain && this.gameInformation.map.objects && this.gameInformation.players) {
        this.gameInformation.updateMap();
        this.gameInformation.updatePlayerInfo();
        this.gameInformation.updateScoreboard();
        this.gameInformation.updateGameInfo();
      }
    });

  this.roomCountSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_ROOM_COUNTS)
    .subscribe((dataString: number[]) => {
      for (let i = 0; i < this.gameInformation.rooms.length; i++)
        this.gameInformation.rooms[i].playerCount = dataString[i];
    });

  this.multiLoginSub = this.socketService.getData(Constants.SOCKET_EVENT_MULTILOGIN).subscribe(() => {
    this.loginService.logout();
  });

  this.currentRoomSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_CURRENT_ROOM).subscribe((roomNumber: number) => {
    this.gameInformation.currentRoom = this.gameInformation.rooms[roomNumber];
  });

  this.eloSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_ELO).subscribe((eloResults: EloResult[]) => {
    this.gameInformation.eloResults = eloResults;
  });
  }
}
