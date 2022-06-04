import { Injectable } from '@angular/core';
import { Constants } from 'src/constants/constants';
import { GraphicConstants } from 'src/constants/graphicConstants';
import * as PIXI from 'pixi.js'

@Injectable()
export class MapGraphics {
  public terrain: any[][];
  public objects: any[][];
  public mobs: any[][];
  public ownership: any[][];

  constructor() {
    this.terrain = new Array<Array<any>>();
    this.objects = new Array<Array<any>>();
    this.mobs = new Array<Array<any>>();
    this.ownership = new Array<Array<any>>();


    for (let x = 0; x < Constants.MAP_VIEW_SIZE; x++) {
      const terrainRow: any[] = new Array<any>();
      const objectRow: any[] = new Array<any>();
      const mobRow: any[] = new Array<any>();
      const ownershipRow: any[] = new Array<any>();
      for (let y = 0; y < Constants.MAP_VIEW_SIZE; y++) {
        const tileX = x * Constants.TILE_SIZE + 6;
        const tileY = y * Constants.TILE_SIZE + 41;
        const mobTile = new PIXI.Sprite();
        const objectTile = new PIXI.Sprite();
        const terrainTile = new PIXI.Sprite(GraphicConstants.terrain.get(Constants.TERRAIN_FLOOR));
        const ownershipTile = new PIXI.Sprite();
        terrainTile.x = tileX;
        terrainTile.y = tileY;
        objectTile.x = tileX;
        objectTile.y = tileY;
        mobTile.x = tileX;
        mobTile.y = tileY;
        ownershipTile.x = tileX;
        ownershipTile.y = tileY;

        terrainRow.push(terrainTile);
        objectRow.push(objectTile);
        mobRow.push(mobTile);
        ownershipRow.push(ownershipTile);
      }
      this.terrain.push(terrainRow);
      this.objects.push(objectRow);
      this.mobs.push(mobRow);
      this.ownership.push(ownershipRow);
    }
  }
}
