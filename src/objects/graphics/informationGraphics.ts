import { Injectable } from '@angular/core';
import { Constants } from 'src/constants/constants';
import { GraphicConstants } from 'src/constants/graphicConstants';
import * as PIXI from 'pixi.js'

@Injectable()
export class InformationGraphics {
  public inventory: any[][];
  public time: any[];
  public leaderboard: any[];

  constructor() {
    this.inventory = new Array<Array<any>>();
    for (let i = 0; i < 2; i++) {
      const inventoryRow: any[] = new Array<any>();
      for (let j = 0; j < 5; j++) {
        const inventoryTile = new PIXI.Sprite();
        const tileX = Constants.MAIN_PANEL_SIZE + Constants.TILE_SIZE + (Constants.TILE_SIZE * j) + 13;
        const tileY = Constants.INVENTORY_TILES_Y + (Constants.TILE_SIZE * i) + 35;
        inventoryTile.x = tileX;
        inventoryTile.y = tileY;
        inventoryRow.push(inventoryTile);
      }
      this.inventory.push(inventoryRow);
    }

    this.time = new Array<any>();
    for (var i = 0; i < 3; i++) {
      const timeGraphic = new PIXI.Sprite(GraphicConstants.timeAssets.get('GREEN_EMPTY'));
      timeGraphic.x = Constants.MAIN_PANEL_SIZE + 101 + (i * 17);
      timeGraphic.y = 76;
      this.time.push(timeGraphic);
    }

    this.leaderboard = new Array<any>();
    for (let i = 0; i < 6; i++) {
      const playerScoreGraphic = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 14, fill: 0x000000, fontWeight: 'normal' });
      playerScoreGraphic.x = Constants.MAIN_PANEL_SIZE + 122;
      playerScoreGraphic.y = 139 + (i * 18);
      playerScoreGraphic.anchor.set(0.5);
      this.leaderboard.push(playerScoreGraphic);
    }
  }
}
