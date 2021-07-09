import { EloResult } from './../objects/eloResult';
import { UserInfo } from '../objects/userInfo';
import { AuthService } from './services/auth.service';
import { Player } from './../objects/player';
import { MovementService } from './services/movement.service';
import { SocketIOService } from './services/socketio.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from '../constants/constants';
import { Room, GAME_ROOMS } from './../objects/room';
import { Forms } from 'src/objects/forms';
import { Graphics } from 'src/objects/graphics/graphics';
import { GameInformation } from 'src/objects/gameInformation';
import { MapInformation } from 'src/objects/mapInformation';
import { GameState, LoginState, MenuState } from 'src/constants/states';

export declare var PIXI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public userInfo: UserInfo;

  public forms: Forms = new Forms();
  public graphics: Graphics = new Graphics();
  public gameInformation: GameInformation = new GameInformation();
  public mapInformation: MapInformation = new MapInformation();

  private socketService: SocketIOService;
  private movementService: MovementService;
  private authService: AuthService;

  public app: any = new PIXI.Application(
    300 + Constants.INVENTORY_PIXELS + 13, 370,
    { transparent: true }
  );

  public container = new PIXI.Container();

  // Subscriptions for various socket messages
  public roomCountSub: Subscription;
  public currentRoomSub: Subscription;
  public gameMapSub: Subscription;
  public multiLoginSub: Subscription;
  public eloSub: Subscription;

  public rooms: Room[] = GAME_ROOMS;

  public currentRoom: Room;

  public menuState: MenuState = MenuState.Menu;
  public loginState: LoginState = LoginState.LoggedOut;
  public gameState: GameState = GameState.Starting;

  public MenuStates = MenuState;
  public LoginStates = LoginState;
  public GameStates = GameState;

  public eloResults: EloResult[];

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.type === 'keyup') {
      if (event.key === Constants.DEFAULT_KEY_UP_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_UP);
      else if (event.key === Constants.DEFAULT_KEY_DOWN_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_DOWN);
      else if (event.key === Constants.DEFAULT_KEY_RIGHT_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_RIGHT);
      else if (event.key === Constants.DEFAULT_KEY_LEFT_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_LEFT);
    }
    else if (event.type === 'keydown') {
      if (event.key === Constants.DEFAULT_KEY_UP_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_UP);
      else if (event.key === Constants.DEFAULT_KEY_DOWN_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_DOWN);
      else if (event.key === Constants.DEFAULT_KEY_RIGHT_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_RIGHT);
      else if (event.key === Constants.DEFAULT_KEY_LEFT_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_LEFT);
      else if (event.key === Constants.DEFAULT_KEY_THROW_BOWLING_BALL)
        this.movementService.sendKeyDown(Constants.THROW_BOWLING_BALL);
      else if (event.key === Constants.DEFAULT_KEY_CALL_WHISTLE)
        this.movementService.sendKeyDown(Constants.CALL_WHISTLE)
      else if (event.key === Constants.DEFAULT_KEY_ENTER) {
        switch (this.menuState) {
          case MenuState.Login: this.logIntoAccount(); break;
          case MenuState.Menu: this.playGame(); break;
          case MenuState.CreateAccount: this.createAccount(); break;
          case MenuState.Lobbies:
          case MenuState.Playing:
          case MenuState.Loading: break;
        }
      }
    }
  }

  constructor(socketService: SocketIOService, movementService: MovementService, authService: AuthService) {
    this.socketService = socketService;
    this.movementService = movementService;
    this.authService = authService;
  }

  ngOnInit() {
    this.menuState = MenuState.Loading;
    if (localStorage.getItem('refresh_token') !== null) {
      this.authService.getNewAccessToken()
        .subscribe((res) => {
          localStorage.setItem("access_token", res.accessToken);
          this.loginState = LoginState.LoggedIn;
          this.authService.getInfo().subscribe((res) => {
            this.userInfo = res;
          });
          this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, localStorage.getItem("access_token"));
          this.menuState = MenuState.Menu;
        }, () => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          this.loginState = LoginState.LoggedOut;
          this.menuState = MenuState.Menu;
          this.userInfo = null;
        });
    }
    else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.loginState = LoginState.LoggedOut;
      this.menuState = MenuState.Menu;
      this.userInfo = null;
    }

    document.getElementById('map').appendChild(this.app.view);

    this.app.stage.addChild(this.graphics.assets.mainPanel);
    this.app.stage.addChild(this.graphics.assets.sidePanel);

    for (var i = 0; i < 3; i++)
      this.app.stage.addChild(this.graphics.information.time[i]);

    for (let i = 0; i < 6; i++)
      this.app.stage.addChild(this.graphics.information.leaderboard[i]);

    for (let x = 0; x < Constants.MAP_VIEW_SIZE; x++) {
      for (let y = 0; y < Constants.MAP_VIEW_SIZE; y++) {
        this.app.stage.addChild(this.graphics.map.terrain[x][y]);
        this.app.stage.addChild(this.graphics.map.objects[x][y]);
        this.app.stage.addChild(this.graphics.map.mobs[x][y]);
        this.app.stage.addChild(this.graphics.map.ownership[x][y]);
      }
    }

    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 5; j++)
        this.app.stage.addChild(this.graphics.information.inventory[i][j]);

    this.app.stage.addChild(this.graphics.results.panel);

    for (let i = 0; i < 8; i++)
      this.app.stage.addChild(this.graphics.results.topPlayers[i]);

    this.app.stage.addChild(this.graphics.results.player);

    this.gameMapSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_GAME_MAP_FULL)
      .subscribe((dataString: any) => {
        const data = JSON.parse(dataString);
        if (data.mobs)
          this.mapInformation.mobs = data.mobs;
        if (data.terrain)
          this.mapInformation.terrain = data.terrain;
        if (data.object)
          this.mapInformation.objects = data.object;
        if (data.gameStatus !== undefined) {
          this.gameInformation.status = data.gameStatus;
        }
        if (data.players && this.gameInformation.status !== Constants.GAME_STATUS_FINISHED)
          this.gameInformation.players = (data.players as Player[]).sort((a, b) => (a.score < b.score) ? 1 : -1);;
        if (data.time)
          this.gameInformation.time = data.time;

        if (this.mapInformation.mobs && this.mapInformation.terrain && this.mapInformation.objects && this.gameInformation.players) {
          this.updateMap();
          this.updatePlayerInfo();
          this.updateScoreboard();
          this.updateGameInfo();
          if (this.gameState == GameState.Finished)
            this.updateEndGameInfo();
          else
            this.resetEndGameInfo();
        }
      });

    this.gameMapSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_GAME_MAP_DELTA)
      .subscribe((dataString: any) => {
        const data = JSON.parse(dataString);

        if (data.mobs)
          this.updateMobs(data.mobs);
        if (data.terrain)
          this.updateTerrain(data.terrain);
        if (data.object)
          this.updateObjects(data.object);
        if (data.gameStatus !== undefined) {
          this.gameInformation.status = data.gameStatus;
        }
        if (data.players && this.gameInformation.status !== Constants.GAME_STATUS_FINISHED)
          this.gameInformation.players = (data.players as Player[]).sort((a, b) => (a.score < b.score) ? 1 : -1);;
        if (data.time)
          this.gameInformation.time = data.time;

        if (this.mapInformation.mobs && this.mapInformation.terrain && this.mapInformation.objects && this.gameInformation.players) {
          this.updateMap();
          this.updatePlayerInfo();
          this.updateScoreboard();
          this.updateGameInfo();
        }
      });

    this.roomCountSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_ROOM_COUNTS)
      .subscribe((dataString: number[]) => {
        for (let i = 0; i < this.rooms.length; i++)
          this.rooms[i].playerCount = dataString[i];
      });

    this.multiLoginSub = this.socketService.getData(Constants.SOCKET_EVENT_MULTILOGIN).subscribe(() => {
      this.logout();
    });

    this.currentRoomSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_CURRENT_ROOM).subscribe((roomNumber: number) => {
      this.currentRoom = this.rooms[roomNumber];
    });

    this.eloSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_ELO).subscribe((eloResults: EloResult[]) => {
      this.eloResults = eloResults;
    })
  }

  updateMap(): void {
    const playerCoords = this.findPlayerCoordinates() ||
      [Math.floor(Constants.MAP_SIZE / 2), Math.floor(Constants.MAP_SIZE / 2)];
    for (let relativeX = 0; relativeX < Constants.MAP_VIEW_SIZE; relativeX++) {
      for (let relativeY = 0; relativeY < Constants.MAP_VIEW_SIZE; relativeY++) {
        const x = (playerCoords[0] + relativeX - Math.floor((Constants.MAP_VIEW_SIZE / 2)) + Constants.MAP_SIZE) % Constants.MAP_SIZE;
        const y = (playerCoords[1] + relativeY - Math.floor((Constants.MAP_VIEW_SIZE / 2)) + Constants.MAP_SIZE) % Constants.MAP_SIZE;
        if (this.mapInformation.mobs[x][y] && this.mapInformation.mobs[x][y] !== 0) {
          let mobTileValue = this.mapInformation.mobs[x][y]?.value;
          if ([Constants.MOB_PLAYER_UP, Constants.MOB_PLAYER_DOWN, Constants.MOB_PLAYER_LEFT, Constants.MOB_PLAYER_RIGHT].includes(mobTileValue)) {
            let isPlayerOnWater = this.mapInformation.terrain[x][y] === Constants.TERRAIN_WATER;
            let isCurrentPlayer = this.mapInformation.mobs[x][y]?.id === this.socketService.getSocketId()
            var updatedValue = mobTileValue;

            switch (mobTileValue) {
              case Constants.MOB_PLAYER_UP:
                if (isPlayerOnWater && isCurrentPlayer)
                  updatedValue = Constants.MOB_PLAYER_UP_SWIM;
                else if (isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_UP_SWIM;
                else if (!isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_UP;
                break;
              case Constants.MOB_PLAYER_LEFT:
                if (isPlayerOnWater && isCurrentPlayer)
                  updatedValue = Constants.MOB_PLAYER_LEFT_SWIM;
                else if (isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_LEFT_SWIM;
                else if (!isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_LEFT;
                break;
              case Constants.MOB_PLAYER_DOWN:
                if (isPlayerOnWater && isCurrentPlayer)
                  updatedValue = Constants.MOB_PLAYER_DOWN_SWIM;
                else if (isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_DOWN_SWIM;
                else if (!isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_DOWN;
                break;
              case Constants.MOB_PLAYER_RIGHT:
                if (isPlayerOnWater && isCurrentPlayer)
                  updatedValue = Constants.MOB_PLAYER_RIGHT_SWIM;
                else if (isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_RIGHT_SWIM;
                else if (!isPlayerOnWater && !isCurrentPlayer)
                  updatedValue = Constants.MOB_OPPONENT_RIGHT;
                break;
            }
            this.graphics.setMobTile(relativeX, relativeY, updatedValue);
          }
          else {
            this.graphics.setMobTile(relativeX, relativeY, this.mapInformation.mobs[x][y].value);
          }

          if (this.mapInformation.mobs[x][y]?.owner === this.socketService.getSocketId())
            this.graphics.setOwnershipTile(relativeX, relativeY, Constants.OWNER_GREEN);
          else if (this.mapInformation.mobs[x][y]?.owner)
            this.graphics.setOwnershipTile(relativeX, relativeY, Constants.OWNER_RED);
          else
            this.graphics.setOwnershipTile(relativeX, relativeY, null);
        }
        else {
          this.graphics.setMobTile(relativeX, relativeY, null);
          this.graphics.setOwnershipTile(relativeX, relativeY, null);
        }
        if (this.mapInformation.objects[x][y])
          this.graphics.setObjectTile(relativeX, relativeY, this.mapInformation.objects[x][y]);
        else
          this.graphics.setObjectTile(relativeX, relativeY, null);
        this.graphics.setTerrainTile(relativeX, relativeY, this.mapInformation.terrain[x][y]);
      }
    }
  }

  updateGameInfo(): void {
    switch (this.gameInformation.status) {
      case (Constants.GAME_STATUS_PLAYING):
        this.gameState = GameState.Playing;
        break;
      case (Constants.GAME_STATUS_NOT_STARTED):
        this.gameState = GameState.Starting;
        break;
      case (Constants.GAME_STATUS_FINISHED):
        this.gameState = GameState.Finished;
        break;
    }
  }

  updatePlayerInfo(): void {
    const currentPlayer = this.findPlayer();
    if (!currentPlayer || currentPlayer.quit) {
      if ([MenuState.Playing, MenuState.Respawning].includes(this.menuState))
        this.menuState = MenuState.Menu;
    }
    else if (currentPlayer.alive)
      this.menuState = MenuState.Playing;
    else if (!currentPlayer.alive)
      this.menuState = MenuState.Respawning;

    if (currentPlayer) {
      var inventory = currentPlayer.inventory;

      this.graphics.setInventory(inventory);
    }
  }

  updateScoreboard(): void {
    this.graphics.setLeaderboard(this.gameInformation.players, this.socketService.getSocketId());

    const timeToParse = this.gameInformation.status == Constants.GAME_STATUS_NOT_STARTED ?
      Constants.GAMEPLAY_TIMER :
      this.gameInformation.status == Constants.GAME_STATUS_FINISHED ?
        0 :
        this.gameInformation.time;

    this.graphics.setTime(timeToParse);
  }

  updateEndGameInfo(): void {
    this.graphics.showResultsPanel(this.gameInformation.players, this.eloResults, this.socketService.getSocketId());
  }

  resetEndGameInfo(): void {
    this.graphics.hideResults();
    this.eloResults = null;
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

  goToCreateAccount(): void {
    this.menuState = MenuState.CreateAccount;
  }

  logout(): void {
    this.menuState = MenuState.Loading;
    this.authService.logout().subscribe((res) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.loginState = LoginState.LoggedOut;
      this.menuState = MenuState.Menu;
      this.userInfo = null;
    }, (err) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.loginState = LoginState.LoggedOut;
      this.menuState = MenuState.Menu;
      this.userInfo = null;
    });
  }

  goToMenu(): void {
    this.menuState = MenuState.Menu;
  }

  logIntoAccount(): void {
    if (this.forms.loginForm.valid) {
      let username = this.forms.loginForm.controls['username'].value;
      let password = this.forms.loginForm.controls['password'].value;

      this.menuState = MenuState.Loading;
      this.authService.login(username, password)
        .subscribe((res) => {
          localStorage.setItem("access_token", res.accessToken);
          localStorage.setItem("refresh_token", res.refreshToken);
          this.loginState = LoginState.LoggedIn;
          this.authService.getInfo().subscribe((res) => {
            this.userInfo = res;
          });
          this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, localStorage.getItem("access_token"));
          this.menuState = MenuState.Menu;
        }, () => {
          this.loginState = LoginState.Failed;
          this.menuState = MenuState.Login;
          this.userInfo = null;
        });
    }
  }

  createAccount(): void {
    if (this.forms.createAccountForm.valid) {
      let username = this.forms.createAccountForm.controls['username'].value;
      let password = this.forms.createAccountForm.controls['password'].value;
      let email = this.forms.createAccountForm.controls['email'].value;

      this.menuState = MenuState.Loading;
      this.authService.createAccount(username, password, email)
        .subscribe(() => {
          this.forms.loginForm.controls['username'].setValue(username);
          this.forms.loginForm.controls['password'].setValue(password);
          this.logIntoAccount();
        }, () => {
          this.loginState = LoginState.Failed;
          this.menuState = MenuState.CreateAccount;
          this.userInfo = null;
        });
    }
  }

  findPlayerCoordinates(): number[] {
    for (let x = 0; x < Constants.MAP_SIZE; x++) {
      for (let y = 0; y < Constants.MAP_SIZE; y++) {
        const tile = this.mapInformation.mobs[x][y];
        if (tile && this.tileIsPlayer(tile) && tile.id === this.socketService.getSocketId()) {
          return [x, y];
        }
      }
    }
    return null;
  }

  findPlayer(): Player {
    return this.gameInformation.players.filter(player => {
      return player.id === this.socketService.getSocketId();
    })[0];
  }

  private tileIsPlayer(tile: any) {
    return tile?.value === Constants.MOB_PLAYER_UP ||
      tile?.value === Constants.MOB_PLAYER_DOWN ||
      tile?.value === Constants.MOB_PLAYER_RIGHT ||
      tile?.value === Constants.MOB_PLAYER_LEFT;
  }

  joinRoom(roomName: string): void {
    const roomNumber = GAME_ROOMS.map(room => room.name).indexOf(roomName);
    this.socketService.sendData(Constants.SOCKET_EVENT_JOIN_ROOM, roomNumber);
  }

  updateMobs(mobs: string) {
    const listOfChanges = mobs.split(';');
    listOfChanges.forEach(mobChange => {
      const changeInfo = mobChange.split(':');
      if (changeInfo.length == 3 && changeInfo[2] === '0') {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const newTile = 0;
        if (this.mapInformation.mobs)
          this.mapInformation.mobs[x][y] = newTile;
      } else if (changeInfo.length == 5) {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const id = changeInfo[2];
        const value = changeInfo[3];
        const owner = changeInfo[4];

        if (this.mapInformation.mobs)
          this.mapInformation.mobs[x][y] = { id, value: parseInt(value), owner: owner === '0' ? null : owner }
      }
    });
  }

  updateObjects(objects: string) {
    const listOfChanges = objects.split(';');
    listOfChanges.forEach(objectChange => {
      const changeInfo = objectChange.split(':');
      if (changeInfo.length == 3) {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const newTile = changeInfo[2];
        if (this.mapInformation.objects)
          this.mapInformation.objects[x][y] = parseInt(newTile);
      }
    });
  }

  updateTerrain(terrain: string) {
    const listOfChanges = terrain.split(';');
    listOfChanges.forEach(terrainChange => {
      const changeInfo = terrainChange.split(':');
      if (changeInfo.length == 3) {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const newTile = changeInfo[2];
        if (this.mapInformation.terrain)
          this.mapInformation.terrain[x][y] = parseInt(newTile);
      }
    });
  }

  centerPanelShouldShow(): boolean {
    return this.menuState === MenuState.Menu ||
      this.menuState === MenuState.CreateAccount ||
      this.menuState === MenuState.Loading ||
      this.menuState === MenuState.Lobbies ||
      this.menuState === MenuState.Login ||
      this.menuState === MenuState.Respawning ||
      (this.menuState === MenuState.Playing && this.gameState === GameState.Starting);
  }

  centerFooterPanelShouldShow(): boolean {
    return this.menuState === MenuState.Menu ||
      this.menuState === MenuState.CreateAccount ||
      this.menuState === MenuState.Lobbies ||
      this.menuState === MenuState.Login;
  }

  isPlaying(): boolean {
    return this.menuState === MenuState.Playing || this.menuState === MenuState.Respawning;
  }
}
