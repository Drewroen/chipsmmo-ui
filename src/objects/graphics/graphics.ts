import { Constants } from 'src/constants/constants';
import { GraphicConstants } from 'src/constants/graphicConstants';
import { EloResult } from '../eloResult';
import { Inventory, Player } from '../player';
import { AssetGraphics } from './assetGraphics';
import { InformationGraphics } from './informationGraphics';
import { MapGraphics } from './mapGraphics';
import { ResultGraphics } from './resultGraphics';

declare var PIXI: any;

const inventoryTextureList: Map<number, any> = new Map([
  [Constants.OBJECT_BLUE_KEY, PIXI.Texture.from('./../assets/CC_TILE_65_BLUE_KEY.png')],
  [Constants.OBJECT_RED_KEY, PIXI.Texture.from('./../assets/CC_TILE_66_RED_KEY.png')],
  [Constants.OBJECT_GREEN_KEY, PIXI.Texture.from('./../assets/CC_TILE_67_GREEN_KEY.png')],
  [Constants.OBJECT_YELLOW_KEY, PIXI.Texture.from('./../assets/CC_TILE_68_YELLOW_KEY.png')],
  [Constants.OBJECT_FIRE_BOOTS, PIXI.Texture.from('./../assets/CC_TILE_74_FIRE_BOOTS.png')],
  [Constants.OBJECT_FLIPPERS, PIXI.Texture.from('./../assets/CC_TILE_73_FLIPPERS.png')],
  [Constants.OBJECT_ICE_SKATES, PIXI.Texture.from('./../assets/CC_TILE_75_ICE_SKATES.png')],
  [Constants.OBJECT_SUCTION_BOOTS, PIXI.Texture.from('./../assets/CC_TILE_76_SUCTION_BOOTS.png')],
  [Constants.OBJECT_BOWLING_BALL, PIXI.Texture.from('./../assets/CC_TILE_91_BOWLING_BALL.png')],
  [Constants.OBJECT_WHISTLE, PIXI.Texture.from('./../assets/CC_TILE_95_WHISTLE.png')]
]);

export class Graphics {
  public map: MapGraphics;
  public information: InformationGraphics;
  public assets: AssetGraphics;
  public results: ResultGraphics;

  constructor() {
    this.map = new MapGraphics();
    this.information = new InformationGraphics();
    this.assets = new AssetGraphics();
    this.results = new ResultGraphics();
  }

  public setTerrainTile(x: number, y: number, value: number) {
    this.map.terrain[x][y].texture = value ? GraphicConstants.terrain.get(value) : null;
  }

  public setObjectTile(x: number, y: number, value: number) {
    this.map.objects[x][y].texture = value ? GraphicConstants.object.get(value) : null;
  }

  public setMobTile(x: number, y: number, value: number) {
    this.map.mobs[x][y].texture = value ? GraphicConstants.mob.get(value) : null;
  }

  public setOwnershipTile(x: number, y: number, value: number) {
    this.map.ownership[x][y].texture = value ? GraphicConstants.ownership.get(value) : null;
  }

  public setInventory(inventory: Inventory) {
    this.setInventoryTile(0, 0, inventory.redKeys > 0 ? Constants.OBJECT_RED_KEY : null);
    this.setInventoryTile(0, 1, inventory.blueKeys > 0 ? Constants.OBJECT_BLUE_KEY : null);
    this.setInventoryTile(0, 2, inventory.yellowKeys > 0 ? Constants.OBJECT_YELLOW_KEY : null);
    this.setInventoryTile(0, 3, inventory.greenKey === true ? Constants.OBJECT_GREEN_KEY : null);
    this.setInventoryTile(0, 4, inventory.bowlingBalls > 0 ? Constants.OBJECT_BOWLING_BALL : null);
    this.setInventoryTile(1, 0, inventory.iceSkates === true ? Constants.OBJECT_ICE_SKATES : null);
    this.setInventoryTile(1, 1, inventory.forceBoots === true ? Constants.OBJECT_SUCTION_BOOTS : null);
    this.setInventoryTile(1, 2, inventory.fireBoots === true ? Constants.OBJECT_FIRE_BOOTS : null);
    this.setInventoryTile(1, 3, inventory.flippers === true ? Constants.OBJECT_FLIPPERS : null);
    this.setInventoryTile(1, 4, inventory.whistles > 0 ? Constants.OBJECT_WHISTLE : null);
  }

  private setInventoryTile(x: number, y: number, value: number) {
    this.information.inventory[x][y].texture = value ? inventoryTextureList.get(value) : null;
  }

  public setTime(time: number) {
    let firstDigit = Math.floor(time / 100).toString();
    let secondDigit = Math.floor((time % 100) / 10).toString();
    let thirdDigit = (time % 10).toString();

    const color = time < 30 ? 'YELLOW_' : 'GREEN_';

    if (firstDigit === '0')
      firstDigit = 'EMPTY';
    if (secondDigit === '0' && firstDigit === 'EMPTY')
      secondDigit = 'EMPTY';

    this.information.time[0].texture = GraphicConstants.timeAssets.get(color + firstDigit);
    this.information.time[1].texture = GraphicConstants.timeAssets.get(color + secondDigit);
    this.information.time[2].texture = GraphicConstants.timeAssets.get(color + thirdDigit);
  }

  public setLeaderboard(players: Player[], socketId: string) {
    let thisPlayerInTopFive = false;
    for (let i = 0; i < 6; i++) {
      if (players && players[i]) {
        if (i === 5 && !thisPlayerInTopFive) {
          const currentPlayer = players.filter(player => player.id === socketId)[0];
          const currentPlayerPosition = players
            .map(function (player) { return player.id; })
            .indexOf(socketId);
          if (currentPlayer) {
            this.information.leaderboard[i].text =
              (currentPlayerPosition + 1) +
              '. ' +
              (players[currentPlayerPosition].name?.toLocaleUpperCase() || 'Chip') +
              ' - ' +
              players[currentPlayerPosition].score;
          }
        }
        else {
          this.information.leaderboard[i].text =
            (i + 1) +
            '. ' +
            (players[i].name?.toLocaleUpperCase() || 'Chip') +
            ' - ' +
            players[i].score;
          if (players[i].id === socketId) {
            this.information.leaderboard[i].style.fontWeight = 600;
            thisPlayerInTopFive = true;
          }
          else
          this.information.leaderboard[i].style.fontWeight = 300;
        }
      }
      else
      this.information.leaderboard[i].text = '';
    }
  }

  public hideResults() {
    this.results.panel.texture = null;
    this.results.player.text = null;

    for (var i = 0; i < 8; i++)
      this.results.topPlayers[i].text = null;
  }

  public showResultsPanel(players: Player[], eloResults: EloResult[], socketId: string) {
    this.results.panel.texture = GraphicConstants.gameAssets.get('ENDGAME_PANEL')

    const currentPlayer = players.filter(player => player.id === socketId)[0];
    const currentPlayerPosition = players
      .map(function (player) { return player.id; })
      .indexOf(socketId);
    this.results.player.text = currentPlayer ? (currentPlayerPosition + 1) + '. ' + currentPlayer.name : '';

    for (var i = 0; i < 8; i++) {
      if (players[i]) {
        var scoreText = ""
        scoreText += (i + 1) + ". " + players[i].name + " - " + players[i].score
        if (eloResults) {
          var eloInfo = eloResults.filter(elo => elo.id == players[i].name)[0];
          if (eloInfo) {
            if (eloInfo.previousElo < eloInfo.newElo)
              scoreText += " (" + eloInfo.previousElo + "▲" + eloInfo.newElo + ")";
            else if (eloInfo.previousElo > eloInfo.newElo)
              scoreText += " (" + eloInfo.previousElo + "▼" + eloInfo.newElo + ")";
            else
              scoreText += " (" + eloInfo.previousElo + "◆" + eloInfo.newElo + ")";
          }

        }
        this.results.topPlayers[i].text = scoreText;
      }
    }
  }
}
