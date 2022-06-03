import { Injectable } from '@angular/core';
import { Constants } from 'src/constants/constants';
import { Graphics } from './graphics/graphics';
import * as PIXI from 'pixi.js'

@Injectable()
export class PixiApp {
  public app: any;

  constructor(private graphics: Graphics)
  {
    this.app = new PIXI.Application(
      {
        transparent: true,
        height: 370,
        width: 300 + Constants.INVENTORY_PIXELS + 13
      }
    );

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
  }
}
