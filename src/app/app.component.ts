import { EloResult } from './../objects/eloResult';
import { UserInfo } from '../objects/userInfo';
import { AuthService } from './services/auth.service';
import { Player } from './../objects/player';
import { MovementService } from './services/movement.service';
import { SocketIOService } from './services/socketio.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from '../constants/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room, GAME_ROOMS } from './../objects/room';

declare var PIXI:any;

const terrainTextureList: Map<number, any> = new Map([
  [Constants.TERRAIN_FLOOR, PIXI.Texture.from('./../assets/CC_TILE_0_EMPTY.png')],
  [Constants.TERRAIN_WALL, PIXI.Texture.from('./../assets/CC_TILE_3_WALL.png')],
  [Constants.TERRAIN_WATER, PIXI.Texture.from('./../assets/CC_TILE_5_WATER.png')],
  [Constants.TERRAIN_FINISH, PIXI.Texture.from('./../assets/CC_TILE_7_FINISH.png')],
  [Constants.TERRAIN_SOCKET, PIXI.Texture.from('./../assets/CC_TILE_8_SOCKET.png')],
  [Constants.TERRAIN_FORCE_UP, PIXI.Texture.from('./../assets/CC_TILE_9_FORCE_UP.png')],
  [Constants.TERRAIN_FORCE_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_10_FORCE_RIGHT.png')],
  [Constants.TERRAIN_FORCE_DOWN, PIXI.Texture.from('./../assets/CC_TILE_11_FORCE_DOWN.png')],
  [Constants.TERRAIN_FORCE_LEFT, PIXI.Texture.from('./../assets/CC_TILE_12_FORCE_LEFT.png')],
  [Constants.TERRAIN_FORCE_RANDOM, PIXI.Texture.from('./../assets/CC_TILE_36_FORCE_RANDOM.png')],
  [Constants.TERRAIN_ICE, PIXI.Texture.from('./../assets/CC_TILE_13_ICE.png')],
  [Constants.TERRAIN_TOGGLE_WALL_CLOSED, PIXI.Texture.from('./../assets/CC_TILE_32_TOGGLE_WALL_CLOSED.png')],
  [Constants.TERRAIN_TOGGLE_WALL_OPEN, PIXI.Texture.from('./../assets/CC_TILE_33_TOGGLE_WALL_OPEN.png')],
  [Constants.TERRAIN_TOGGLE_BUTTON, PIXI.Texture.from('./../assets/CC_TILE_34_TOGGLE_BUTTON.png')],
  [Constants.TERRAIN_BLUE_WALL_FAKE, PIXI.Texture.from('./../assets/CC_TILE_35_BLUE_WALL.png')],
  [Constants.TERRAIN_BLUE_WALL_REAL, PIXI.Texture.from('./../assets/CC_TILE_35_BLUE_WALL.png')],
  [Constants.TERRAIN_FIRE, PIXI.Texture.from('./../assets/CC_TILE_45_FIRE.png')],
  [Constants.TERRAIN_THIN_WALL_UP, PIXI.Texture.from('./../assets/CC_TILE_46_THIN_WALL_UP.png')],
  [Constants.TERRAIN_THIN_WALL_LEFT, PIXI.Texture.from('./../assets/CC_TILE_47_THIN_WALL_LEFT.png')],
  [Constants.TERRAIN_THIN_WALL_DOWN, PIXI.Texture.from('./../assets/CC_TILE_48_THIN_WALL_DOWN.png')],
  [Constants.TERRAIN_THIN_WALL_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_49_THIN_WALL_RIGHT.png')],
  [Constants.TERRAIN_THIN_WALL_DOWN_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_50_THIN_WALL_DOWN_RIGHT.png')],
  [Constants.TERRAIN_DIRT, PIXI.Texture.from('./../assets/CC_TILE_52_DIRT.png')],
  [Constants.TERRAIN_GRAVEL, PIXI.Texture.from('./../assets/CC_TILE_51_GRAVEL.png')],
  [Constants.TERRAIN_CELL_BLOCK, PIXI.Texture.from('./../assets/CC_TILE_53_CELL_BLOCK.png')],
  [Constants.TERRAIN_TANK_TOGGLE_BUTTON, PIXI.Texture.from('./../assets/CC_TILE_59_TANK_BUTTON.png')],
  [Constants.TERRAIN_ICE_CORNER_RIGHT_DOWN, PIXI.Texture.from('./../assets/CC_TILE_61_ICE_RIGHT_DOWN.png')],
  [Constants.TERRAIN_ICE_CORNER_DOWN_LEFT, PIXI.Texture.from('./../assets/CC_TILE_62_ICE_DOWN_LEFT.png')],
  [Constants.TERRAIN_ICE_CORNER_LEFT_UP, PIXI.Texture.from('./../assets/CC_TILE_63_ICE_LEFT_UP.png')],
  [Constants.TERRAIN_ICE_CORNER_UP_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_64_ICE_UP_RIGHT.png')],
  [Constants.TERRAIN_BLUE_KEY_DOOR, PIXI.Texture.from('./../assets/CC_TILE_69_BLUE_KEY_DOOR.png')],
  [Constants.TERRAIN_RED_KEY_DOOR, PIXI.Texture.from('./../assets/CC_TILE_70_RED_KEY_DOOR.png')],
  [Constants.TERRAIN_GREEN_KEY_DOOR, PIXI.Texture.from('./../assets/CC_TILE_71_GREEN_KEY_DOOR.png')],
  [Constants.TERRAIN_YELLOW_KEY_DOOR, PIXI.Texture.from('./../assets/CC_TILE_72_YELLOW_KEY_DOOR.png')],
  [Constants.TERRAIN_THIEF, PIXI.Texture.from('./../assets/CC_TILE_85_THIEF.png')],
  [Constants.TERRAIN_TRAP, PIXI.Texture.from('./../assets/CC_TILE_86_TRAP.png')],
  [Constants.TERRAIN_TRAP_BUTTON, PIXI.Texture.from('./../assets/CC_TILE_87_TRAP_BUTTON.png')],
  [Constants.TERRAIN_TELEPORT, PIXI.Texture.from('./../assets/CC_TILE_88_TELEPORT.png')],
  [Constants.TERRAIN_CLONE_MACHINE, PIXI.Texture.from('./../assets/CC_TILE_89_CLONE_MACHINE.png')],
  [Constants.TERRAIN_CLONE_BUTTON, PIXI.Texture.from('./../assets/CC_TILE_90_CLONE_MACHINE_BUTTON.png')]
]);

const objectTextureList: Map<number, any> = new Map([
  [Constants.OBJECT_CHIP, PIXI.Texture.from('./../assets/CC_TILE_4_CHIP.png')],
  [Constants.OBJECT_BOMB, PIXI.Texture.from('./../assets/CC_TILE_54_BOMB.png')],
  [Constants.OBJECT_BLUE_KEY, PIXI.Texture.from('./../assets/CC_TILE_65_BLUE_KEY.png')],
  [Constants.OBJECT_RED_KEY, PIXI.Texture.from('./../assets/CC_TILE_66_RED_KEY.png')],
  [Constants.OBJECT_GREEN_KEY, PIXI.Texture.from('./../assets/CC_TILE_67_GREEN_KEY.png')],
  [Constants.OBJECT_YELLOW_KEY, PIXI.Texture.from('./../assets/CC_TILE_68_YELLOW_KEY.png')],
  [Constants.OBJECT_FIRE_BOOTS, PIXI.Texture.from('./../assets/CC_TILE_74_FIRE_BOOTS.png')],
  [Constants.OBJECT_FLIPPERS, PIXI.Texture.from('./../assets/CC_TILE_73_FLIPPERS.png')],
  [Constants.OBJECT_ICE_SKATES, PIXI.Texture.from('./../assets/CC_TILE_75_ICE_SKATES.png')],
  [Constants.OBJECT_SUCTION_BOOTS, PIXI.Texture.from('./../assets/CC_TILE_76_SUCTION_BOOTS.png')],
  [Constants.OBJECT_BOWLING_BALL, PIXI.Texture.from('./../assets/CC_TILE_91_BOWLING_BALL.png')]
]);

const mobTextureList: Map<number, any> = new Map([
  [Constants.MOB_PLAYER_UP, PIXI.Texture.from('./../assets/CC_TILE_37_CHIP_UP.png')],
  [Constants.MOB_PLAYER_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_38_CHIP_RIGHT.png')],
  [Constants.MOB_PLAYER_DOWN, PIXI.Texture.from('./../assets/CC_TILE_39_CHIP_DOWN.png')],
  [Constants.MOB_PLAYER_LEFT, PIXI.Texture.from('./../assets/CC_TILE_40_CHIP_LEFT.png')],
  [Constants.MOB_OPPONENT_UP, PIXI.Texture.from('./../assets/CC_TILE_41_OPPONENT_UP.png')],
  [Constants.MOB_OPPONENT_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_42_OPPONENT_RIGHT.png')],
  [Constants.MOB_OPPONENT_DOWN, PIXI.Texture.from('./../assets/CC_TILE_43_OPPONENT_DOWN.png')],
  [Constants.MOB_OPPONENT_LEFT, PIXI.Texture.from('./../assets/CC_TILE_44_OPPONENT_LEFT.png')],
  [Constants.MOB_BALL, PIXI.Texture.from('./../assets/CC_TILE_6_BALL.png')],
  [Constants.MOB_FIREBALL, PIXI.Texture.from('./../assets/CC_TILE_14_FIREBALL.png')],
  [Constants.MOB_GLIDER_UP, PIXI.Texture.from('./../assets/CC_TILE_15_GLIDER_UP.png')],
  [Constants.MOB_GLIDER_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_16_GLIDER_RIGHT.png')],
  [Constants.MOB_GLIDER_DOWN, PIXI.Texture.from('./../assets/CC_TILE_17_GLIDER_DOWN.png')],
  [Constants.MOB_GLIDER_LEFT, PIXI.Texture.from('./../assets/CC_TILE_18_GLIDER_LEFT.png')],
  [Constants.MOB_WALKER_UP_DOWN, PIXI.Texture.from('./../assets/CC_TILE_19_WALKER_UP_DOWN.png')],
  [Constants.MOB_WALKER_LEFT_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_20_WALKER_LEFT_RIGHT.png')],
  [Constants.MOB_PAREMECIUM_UP_DOWN, PIXI.Texture.from('./../assets/CC_TILE_21_PAREMECIUM_UP_DOWN.png')],
  [Constants.MOB_PAREMECIUM_LEFT_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_22_PAREMECIUM_LEFT_RIGHT.png')],
  [Constants.MOB_BUG_UP, PIXI.Texture.from('./../assets/CC_TILE_23_BUG_UP.png')],
  [Constants.MOB_BUG_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_24_BUG_RIGHT.png')],
  [Constants.MOB_BUG_DOWN, PIXI.Texture.from('./../assets/CC_TILE_25_BUG_DOWN.png')],
  [Constants.MOB_BUG_LEFT, PIXI.Texture.from('./../assets/CC_TILE_26_BUG_LEFT.png')],
  [Constants.MOB_BLOB, PIXI.Texture.from('./../assets/CC_TILE_27_BLOB.png')],
  [Constants.MOB_TEETH_UP, PIXI.Texture.from('./../assets/CC_TILE_28_TEETH_UP.png')],
  [Constants.MOB_TEETH_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_29_TEETH_RIGHT.png')],
  [Constants.MOB_TEETH_DOWN, PIXI.Texture.from('./../assets/CC_TILE_30_TEETH_DOWN.png')],
  [Constants.MOB_TEETH_LEFT, PIXI.Texture.from('./../assets/CC_TILE_31_TEETH_LEFT.png')],
  [Constants.MOB_TANK_UP, PIXI.Texture.from('./../assets/CC_TILE_55_TANK_UP.png')],
  [Constants.MOB_TANK_RIGHT, PIXI.Texture.from('./../assets/CC_TILE_56_TANK_RIGHT.png')],
  [Constants.MOB_TANK_DOWN, PIXI.Texture.from('./../assets/CC_TILE_57_TANK_DOWN.png')],
  [Constants.MOB_TANK_LEFT, PIXI.Texture.from('./../assets/CC_TILE_58_TANK_LEFT.png')],
  [Constants.MOB_BLOCK, PIXI.Texture.from('./../assets/CC_TILE_60_BLOCK.png')],
  [Constants.MOB_PLAYER_UP_SWIM, PIXI.Texture.from('./../assets/CC_TILE_77_CHIP_UP_SWIM.png')],
  [Constants.MOB_PLAYER_RIGHT_SWIM, PIXI.Texture.from('./../assets/CC_TILE_78_CHIP_RIGHT_SWIM.png')],
  [Constants.MOB_PLAYER_DOWN_SWIM, PIXI.Texture.from('./../assets/CC_TILE_79_CHIP_DOWN_SWIM.png')],
  [Constants.MOB_PLAYER_LEFT_SWIM, PIXI.Texture.from('./../assets/CC_TILE_80_CHIP_LEFT_SWIM.png')],
  [Constants.MOB_OPPONENT_UP_SWIM, PIXI.Texture.from('./../assets/CC_TILE_81_OPPONENT_UP_SWIM.png')],
  [Constants.MOB_OPPONENT_RIGHT_SWIM, PIXI.Texture.from('./../assets/CC_TILE_82_OPPONENT_RIGHT_SWIM.png')],
  [Constants.MOB_OPPONENT_DOWN_SWIM, PIXI.Texture.from('./../assets/CC_TILE_83_OPPONENT_DOWN_SWIM.png')],
  [Constants.MOB_OPPONENT_LEFT_SWIM, PIXI.Texture.from('./../assets/CC_TILE_84_OPPONENT_LEFT_SWIM.png')],
  [Constants.MOB_BOWLING_BALL, PIXI.Texture.from('./../assets/CC_TILE_91_BOWLING_BALL.png')]
]);

const ownershipTextureList: Map<number, any> = new Map([
  [Constants.OWNER_GREEN, PIXI.Texture.from('./../assets/CC_TILE_92_TEAM_GREEN.png')],
  [Constants.OWNER_RED, PIXI.Texture.from('./../assets/CC_TILE_93_TEAM_RED.png')],
]);

const gameAssets: Map<string, any> = new Map([
  ['SIDE_PANEL', PIXI.Texture.from('./../assets/SIDE_PANEL.png')]
])

export enum MenuState {
  Menu, Login, Playing, Loading, Lobbies, CreateAccount
}

export enum LoginState {
  LoggedIn, LoggedOut, Failed, Banned
}

export enum EmailState {
  Unverified, Verified
}

export enum GameState {
  Starting, Playing, Finished
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public userInfo: UserInfo;

  public loginUsernameForm = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  public loginPasswordForm = new FormControl('', [Validators.required]);

  public usernameForm = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  public passwordForm = new FormControl('', [Validators.required, Validators.maxLength(64)]);
  public confirmPasswordForm = new FormControl('', [Validators.required, Validators.maxLength(64)]);
  public emailForm = new FormControl('', [Validators.email]);

  public loginForm = new FormGroup({
    'username': this.loginUsernameForm,
    'password': this.loginPasswordForm
  });

  public createAccountForm = new FormGroup({
    'username': this.usernameForm,
    'password': this.passwordForm,
    'confirmPassword': this.confirmPasswordForm,
    'email': this.emailForm,
  }, {
    validators: this.passwordsMatch
  });

  public passwordsMatch(group: FormGroup)
  {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  private socketService: SocketIOService;
  private movementService: MovementService;
  private authService: AuthService;

  public app: any = new PIXI.Application(
    (Constants.MAP_VIEW_SIZE * Constants.TILE_SIZE) + Constants.INVENTORY_PIXELS,
    Constants.MAP_VIEW_SIZE * Constants.TILE_SIZE,
    { backgroundColor: 0x999999 }
  );

  // Stores up to date information on the terrain/object/mob values on the map
  public terrainTileInfo: any[][];
  public objectTileInfo: any[][];
  public mobTileInfo: any[][];

  // Stored info about the players, the time remaining, and the status of the game
  public players: Player[] = [];
  public time: any;
  public gameStatus: any;

  // All the graphics
  public terrainGraphic: any[][];
  public objectGraphic: any[][];
  public mobGraphic: any[][];
  public ownershipGraphic: any[][];

  public inventoryGraphic: any[][];
  public leaderboardGraphic: any[];
  public timeRemainingGraphic: any;

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
  public EmailStates = EmailState;
  public GameStates = GameState;

  public eloResults: EloResult[];

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.type === 'keyup')
    {
      if (event.key === Constants.KEY_UP_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_UP);
      else if (event.key === Constants.KEY_DOWN_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_DOWN);
      else if (event.key === Constants.KEY_RIGHT_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_RIGHT);
      else if (event.key === Constants.KEY_LEFT_ARROW)
        this.movementService.sendKeyUp(Constants.DIRECTION_LEFT);
    }
    else if (event.type === 'keydown')
    {
      if (event.key === Constants.KEY_UP_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_UP);
      else if (event.key === Constants.KEY_DOWN_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_DOWN);
      else if (event.key === Constants.KEY_RIGHT_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_RIGHT);
      else if (event.key === Constants.KEY_LEFT_ARROW)
        this.movementService.sendKeyDown(Constants.DIRECTION_LEFT);
      else if (event.key === Constants.KEY_THROW_BOWLING_BALL)
        this.movementService.sendKeyDown(Constants.THROW_BOWLING_BALL);
      else if (event.key === Constants.KEY_ENTER)
      {
        switch (this.menuState)
        {
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

  constructor(socketService: SocketIOService, movementService: MovementService, authService: AuthService){
    this.socketService = socketService;
    this.movementService = movementService;
    this.authService = authService;
  }

  ngOnInit(){
    this.menuState = MenuState.Loading;
    if(localStorage.getItem('refresh_token') !== null)
    {
      this.authService.getNewAccessToken()
      .subscribe((res) => {
        localStorage.setItem("access_token", res.accessToken);
        this.loginState = LoginState.LoggedIn;
        this.authService.getInfo().subscribe((res) => {
          this.userInfo = res;
        });
        this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, localStorage.getItem("access_token"));
        this.menuState = MenuState.Menu;
      }, (err) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.loginState = LoginState.LoggedOut;
        this.menuState = MenuState.Menu;
      });
    }
    else
    {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.loginState = LoginState.LoggedOut;
      this.menuState = MenuState.Menu;
      this.userInfo = null;
    }

    document.getElementById('map').appendChild(this.app.view);

    const sidePanel = new PIXI.Sprite(gameAssets.get('SIDE_PANEL'));
    sidePanel.x = Constants.TILE_SIZE * Constants.MAP_VIEW_SIZE;
    sidePanel.y = 0;
    this.app.stage.addChild(sidePanel);

    this.timeRemainingGraphic = new PIXI.Text('0:00', {font:'20px Arial', fill:0xffff00, fontWeight:'bold'})
    this.timeRemainingGraphic.x = Constants.MAP_VIEW_SIZE * Constants.TILE_SIZE + 17;
    this.timeRemainingGraphic.y = 9;
    this.app.stage.addChild(this.timeRemainingGraphic);

    const leaderboardText = new PIXI.Text('LEADERBOARD', {font:'20px Arial', fill:0xffff00, fontWeight:'bold'});
    leaderboardText.x = Constants.MAP_VIEW_SIZE * Constants.TILE_SIZE + 17;
    leaderboardText.y = 37;
    this.app.stage.addChild(leaderboardText);

    this.leaderboardGraphic = new Array<any>();

    for(let i = 0; i < 6; i++)
    {
      const playerScoreGraphic = new PIXI.Text('', {font:'14px Arial', fill:0xffff00, fontWeight:'normal'});
      playerScoreGraphic.x = Constants.MAP_VIEW_SIZE * Constants.TILE_SIZE + 17;
      playerScoreGraphic.y = 69 + (i * 22);
      this.app.stage.addChild(playerScoreGraphic);
      this.leaderboardGraphic.push(playerScoreGraphic);
    }

    this.terrainGraphic = new Array<Array<any>>();
    this.objectGraphic = new Array<Array<any>>();
    this.mobGraphic = new Array<Array<any>>();
    this.ownershipGraphic = new Array<Array<any>>();
    this.inventoryGraphic = new Array<Array<any>>();

    for (let x = 0; x < Constants.MAP_VIEW_SIZE; x++) {
      const terrainRow: any[]  = new Array<any>();
      const objectRow: any[] = new Array<any>();
      const mobRow: any[] = new Array<any>();
      const ownershipRow: any[] = new Array<any>();
      for (let y = 0; y < Constants.MAP_VIEW_SIZE; y++) {
        const tileX = x * Constants.TILE_SIZE;
        const tileY = y * Constants.TILE_SIZE;
        const mobTile = new PIXI.Sprite();
        const objectTile = new PIXI.Sprite();
        const terrainTile = new PIXI.Sprite(terrainTextureList.get(Constants.TERRAIN_FLOOR));
        const ownershipTile = new PIXI.Sprite();
        terrainTile.x = tileX;
        terrainTile.y = tileY;
        objectTile.x = tileX;
        objectTile.y = tileY;
        mobTile.x = tileX;
        mobTile.y = tileY;
        ownershipTile.x = tileX;
        ownershipTile.y = tileY;
        this.app.stage.addChild(terrainTile);
        this.app.stage.addChild(objectTile);
        this.app.stage.addChild(mobTile);
        this.app.stage.addChild(ownershipTile);

        terrainRow.push(terrainTile);
        objectRow.push(objectTile);
        mobRow.push(mobTile);
        ownershipRow.push(ownershipTile);
      }
      this.terrainGraphic.push(terrainRow);
      this.objectGraphic.push(objectRow);
      this.mobGraphic.push(mobRow);
      this.ownershipGraphic.push(ownershipRow);
    }

    for(let i = 0; i < 2; i++)
    {
      const inventoryRow: any[] = new Array<any>();
      for(let j = 0; j < 5; j++)
      {
        const inventoryTile = new PIXI.Sprite(terrainTextureList.get(Constants.TERRAIN_FLOOR));
        const tileX = Constants.INVENTORY_TILES_X + (Constants.TILE_SIZE * j);
        const tileY = Constants.INVENTORY_TILES_Y + (Constants.TILE_SIZE * i);
        inventoryTile.x = tileX;
        inventoryTile.y = tileY;
        this.app.stage.addChild(inventoryTile);
        inventoryRow.push(inventoryTile);
      }
      this.inventoryGraphic.push(inventoryRow);
    }

    this.gameMapSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_GAME_MAP_FULL)
      .subscribe((dataString: any) => {
        const data = JSON.parse(dataString);
        if (data.mobs)
          this.mobTileInfo = data.mobs;
        if (data.terrain)
          this.terrainTileInfo = data.terrain;
        if (data.object)
          this.objectTileInfo = data.object;
        if (data.players)
          this.players = (data.players as Player[]).sort((a, b) => (a.score < b.score) ? 1 : -1);;
        if (data.gameStatus !== undefined)
        {
          this.gameStatus = data.gameStatus;
        }
        if (data.time)
          this.time = data.time;

        if (this.mobTileInfo && this.terrainTileInfo && this.objectTileInfo && this.players)
        {
          this.updateMap();
          this.updatePlayerInfo();
          this.updateScoreboard();
          this.updateGameInfo();
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
        if (data.players)
          this.players = (data.players as Player[]).sort((a, b) => (a.score < b.score) ? 1 : -1);;
        if (data.gameStatus !== undefined)
        {
          this.gameStatus = data.gameStatus;
        }
        if (data.time)
          this.time = data.time;

        if (this.mobTileInfo && this.terrainTileInfo && this.objectTileInfo && this.players)
        {
          this.updateMap();
          this.updatePlayerInfo();
          this.updateScoreboard();
          this.updateGameInfo();
        }
    });

    this.roomCountSub = this.socketService.getData(Constants.SOCKET_EVENT_UPDATE_ROOM_COUNTS)
      .subscribe((dataString: number[]) => {
        for(let i = 0; i < this.rooms.length; i++)
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
        if(this.mobTileInfo[x][y] && this.mobTileInfo[x][y] !== 0)
        {
          if(this.mobTileInfo[x][y]?.value === Constants.MOB_PLAYER_UP)
          {
            this.mobTileInfo[x][y]?.id === this.socketService.getSocketId() ?
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_UP_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_UP) :
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_UP_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_UP)
          }
          else if(this.mobTileInfo[x][y]?.value === Constants.MOB_PLAYER_DOWN)
          {
            this.mobTileInfo[x][y]?.id === this.socketService.getSocketId() ?
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_DOWN_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_DOWN) :
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_DOWN_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_DOWN)
          }
          else if(this.mobTileInfo[x][y]?.value === Constants.MOB_PLAYER_LEFT)
          {
            this.mobTileInfo[x][y]?.id === this.socketService.getSocketId() ?
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_LEFT_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_LEFT) :
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_LEFT_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_LEFT)
          }
          else if(this.mobTileInfo[x][y]?.value === Constants.MOB_PLAYER_RIGHT)
          {
            this.mobTileInfo[x][y]?.id === this.socketService.getSocketId() ?
            this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_RIGHT_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_PLAYER_RIGHT) :
              this.terrainTileInfo[x][y] === Constants.TERRAIN_WATER ?
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_RIGHT_SWIM) :
                this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(Constants.MOB_OPPONENT_RIGHT)
          }
          else
          {
            this.mobGraphic[relativeX][relativeY].texture = mobTextureList.get(this.mobTileInfo[x][y].value);
          }

          if(this.mobTileInfo[x][y]?.owner === this.socketService.getSocketId())
            this.ownershipGraphic[relativeX][relativeY].texture = ownershipTextureList.get(Constants.OWNER_GREEN);
          else if (this.mobTileInfo[x][y]?.owner)
            this.ownershipGraphic[relativeX][relativeY].texture = ownershipTextureList.get(Constants.OWNER_RED);
          else
            this.ownershipGraphic[relativeX][relativeY].texture = null;
        }
        else
        {
          this.mobGraphic[relativeX][relativeY].texture = null;
          this.ownershipGraphic[relativeX][relativeY].texture = null;
        }
        if (this.objectTileInfo[x][y])
          this.objectGraphic[relativeX][relativeY].texture = objectTextureList.get(this.objectTileInfo[x][y]);
        else
          this.objectGraphic[relativeX][relativeY].texture = null;
        this.terrainGraphic[relativeX][relativeY].texture = terrainTextureList.get(this.terrainTileInfo[x][y]);
      }
    }
  }

  updateGameInfo(): void {
    switch(this.gameStatus) {
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
    if (currentPlayer?.alive)
      this.menuState = MenuState.Playing;
    else if (this.menuState === MenuState.Playing)
      this.menuState = MenuState.Menu;

    if (currentPlayer)
    {
      currentPlayer.inventory.redKeys > 0 ?
        this.inventoryGraphic[0][0].texture = objectTextureList.get(Constants.OBJECT_RED_KEY) :
        this.inventoryGraphic[0][0].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.blueKeys > 0 ?
        this.inventoryGraphic[0][1].texture = objectTextureList.get(Constants.OBJECT_BLUE_KEY) :
        this.inventoryGraphic[0][1].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.yellowKeys > 0 ?
        this.inventoryGraphic[0][2].texture = objectTextureList.get(Constants.OBJECT_YELLOW_KEY) :
        this.inventoryGraphic[0][2].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.greenKey === true ?
        this.inventoryGraphic[0][3].texture = objectTextureList.get(Constants.OBJECT_GREEN_KEY) :
        this.inventoryGraphic[0][3].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.iceSkates === true ?
        this.inventoryGraphic[1][0].texture = objectTextureList.get(Constants.OBJECT_ICE_SKATES) :
        this.inventoryGraphic[1][0].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.forceBoots === true ?
        this.inventoryGraphic[1][1].texture = objectTextureList.get(Constants.OBJECT_SUCTION_BOOTS) :
        this.inventoryGraphic[1][1].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.fireBoots === true ?
        this.inventoryGraphic[1][2].texture = objectTextureList.get(Constants.OBJECT_FIRE_BOOTS) :
        this.inventoryGraphic[1][2].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.flippers === true ?
        this.inventoryGraphic[1][3].texture = objectTextureList.get(Constants.OBJECT_FLIPPERS) :
        this.inventoryGraphic[1][3].texture = terrainTextureList.get(Constants.TERRAIN_FLOOR);

      currentPlayer.inventory.bowlingBalls > 0 ?
        this.inventoryGraphic[0][4].texture = objectTextureList.get(Constants.OBJECT_BOWLING_BALL) :
        this.inventoryGraphic[0][4].texture = objectTextureList.get(Constants.TERRAIN_FLOOR);
    }
  }

  updateScoreboard(): void {
    let thisPlayerInTopFive = false;
    for(let i = 0; i < 6; i++)
    {
      if(this.players && this.players[i])
      {
        if(i === 5 && !thisPlayerInTopFive)
        {
          const currentPlayer = this.players.filter(player => player.id === this.socketService.getSocketId())[0];
          const currentPlayerPosition = this.players
            .map(function(player) { return player.id; })
            .indexOf(this.socketService.getSocketId());
          if(currentPlayer)
          {
            this.leaderboardGraphic[i].text =
            (currentPlayerPosition + 1) +
            '. ' +
            (this.players[currentPlayerPosition].name?.toLocaleUpperCase() || 'Chip') +
            ' - ' +
            this.players[currentPlayerPosition].score;
            this.leaderboardGraphic[i].style.fill = 0xffff00;
          }
        }
        else
        {
          this.leaderboardGraphic[i].text =
          (i + 1) +
          '. ' +
          (this.players[i].name?.toLocaleUpperCase() || 'Chip') +
          ' - ' +
          this.players[i].score;
          if (this.players[i].id === this.socketService.getSocketId())
          {
            this.leaderboardGraphic[i].style.fill = 0xffff00;
            thisPlayerInTopFive = true;
          }
          else
            this.leaderboardGraphic[i].style.fill = 0xdddd00;
        }
      }
      else
        this.leaderboardGraphic[i].text = '';
    }
    const timeToParse = this.gameStatus == Constants.GAME_STATUS_NOT_STARTED ?
      Constants.GAMEPLAY_TIMER :
      this.gameStatus == Constants.GAME_STATUS_FINISHED ?
        0 :
        this.time;
    this.timeRemainingGraphic.text = Math.floor(timeToParse / 60) + ':' + ("0" + (timeToParse % 60)).slice(-2);
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
    if (this.loginForm.valid)
    {
      this.menuState = MenuState.Loading;
      this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
        .subscribe((res) => {
          localStorage.setItem("access_token", res.accessToken);
          localStorage.setItem("refresh_token", res.refreshToken);
          this.loginState = LoginState.LoggedIn;
          this.authService.getInfo().subscribe((res) => {
            this.userInfo = res;
          });
          this.socketService.sendData(Constants.SOCKET_EVENT_LOGIN, localStorage.getItem("access_token"));
          this.menuState = MenuState.Menu;
        }, (err) => {
          this.loginState = LoginState.Failed;
          this.menuState = MenuState.Login;
          this.userInfo = null;
        });
    }
  }

  createAccount(): void {
    if(this.createAccountForm.valid)
    {
      this.menuState = MenuState.Loading;
      this.authService.createAccount(this.usernameForm.value, this.passwordForm.value, this.emailForm.value)
        .subscribe(() => {
          this.loginUsernameForm.setValue(this.usernameForm.value);
          this.loginPasswordForm.setValue(this.passwordForm.value);
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
        const tile = this.mobTileInfo[x][y];
        if (tile && this.tileIsPlayer(tile) && tile.id === this.socketService.getSocketId())
        {
          return [x, y];
        }
      }
    }
    return null;
  }

  findPlayer(): Player {
    return this.players.filter(player => {
      return player.id === this.socketService.getSocketId();
    })[0];
  }

  private tileIsPlayer(tile: any)
  {
    return tile?.value === Constants.MOB_PLAYER_UP ||
           tile?.value === Constants.MOB_PLAYER_DOWN ||
           tile?.value === Constants.MOB_PLAYER_RIGHT ||
           tile?.value === Constants.MOB_PLAYER_LEFT;
  }

  joinRoom(roomName: string): void {
    const roomNumber = GAME_ROOMS.map(room => room.name).indexOf(roomName);
    this.socketService.sendData(Constants.SOCKET_EVENT_JOIN_ROOM, roomNumber);
  }

  getEloResultsForPlayer(name: string): EloResult {
    return this.eloResults ? this.eloResults.filter(result => result.id === name)[0] : null;
  }

  updateMobs(mobs: string) {
    const listOfChanges = mobs.split(';');
    listOfChanges.forEach(mobChange => {
      const changeInfo = mobChange.split(':');
      if (changeInfo.length == 3 && changeInfo[2] === '0') {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const newTile = 0;
        if (this.mobTileInfo)
          this.mobTileInfo[x][y] = newTile;
      } else if (changeInfo.length == 5) {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const id = changeInfo[2];
        const value = changeInfo[3];
        const owner = changeInfo[4];

        if (this.mobTileInfo)
          this.mobTileInfo[x][y] = { id, value: parseInt(value), owner: owner === '0' ? null : owner }
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
        if (this.objectTileInfo)
          this.objectTileInfo[x][y] = parseInt(newTile);
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
        if (this.terrainTileInfo)
          this.terrainTileInfo[x][y] = parseInt(newTile);
      }
    });
  }
}
