import { Injectable } from '@angular/core';
import { SocketIOService } from 'src/app/services/socketio.service';
import { Constants } from 'src/constants/constants';
import { GameState, MenuState } from 'src/constants/states';
import { AppStateService } from './appStateService';
import { EloResult } from './eloResult';
import { Graphics } from './graphics/graphics';
import { MapInformation } from './mapInformation';
import { Player } from './player';
import { GAME_ROOMS, Room } from './room';

@Injectable()
export class GameInformation {
  public players: Player[];
  public time: any;
  public status: any;
  public eloResults: EloResult[];
  public rooms: Room[] = GAME_ROOMS;
  public currentRoom: Room;

  constructor(public map: MapInformation, private socketService: SocketIOService, private graphics: Graphics, private appStateService: AppStateService)
  {
    this.players = [];
  }

  updateMap(): void {
    var width = this.map.terrain.length;
    var height = this.map.terrain[0].length;
    const playerCoords = this.findPlayerCoordinates() ||
      [Math.floor(width / 2), Math.floor(height / 2)];
    for (let relativeX = 0; relativeX < Constants.MAP_VIEW_SIZE; relativeX++) {
      for (let relativeY = 0; relativeY < Constants.MAP_VIEW_SIZE; relativeY++) {
        const x = (playerCoords[0] + relativeX - Math.floor(Constants.MAP_VIEW_SIZE / 2) + width) % width;
        const y = (playerCoords[1] + relativeY - Math.floor(Constants.MAP_VIEW_SIZE / 2) + height) % height;
        if (this.map.mobs[x][y] && this.map.mobs[x][y] !== 0) {
          let mobTileValue = this.map.mobs[x][y]?.value;
          if ([Constants.MOB_PLAYER_UP, Constants.MOB_PLAYER_DOWN, Constants.MOB_PLAYER_LEFT, Constants.MOB_PLAYER_RIGHT].includes(mobTileValue)) {
            let isPlayerOnWater = this.map.terrain[x][y] === Constants.TERRAIN_WATER;
            let isCurrentPlayer = this.map.mobs[x][y]?.id === this.socketService.getSocketId()
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
            this.graphics.setMobTile(relativeX, relativeY, this.map.mobs[x][y].value);
          }

          if (this.map.mobs[x][y]?.owner === this.socketService.getSocketId())
            this.graphics.setOwnershipTile(relativeX, relativeY, Constants.OWNER_GREEN);
          else if (this.map.mobs[x][y]?.owner)
            this.graphics.setOwnershipTile(relativeX, relativeY, Constants.OWNER_RED);
          else
            this.graphics.setOwnershipTile(relativeX, relativeY, null);
        }
        else {
          this.graphics.setMobTile(relativeX, relativeY, null);
          this.graphics.setOwnershipTile(relativeX, relativeY, null);
        }
        if (this.map.objects[x][y])
          this.graphics.setObjectTile(relativeX, relativeY, this.map.objects[x][y]);
        else
          this.graphics.setObjectTile(relativeX, relativeY, null);
        this.graphics.setTerrainTile(relativeX, relativeY, this.map.terrain[x][y]);
      }
    }
  }

  updatePlayerInfo(): void {
    const currentPlayer = this.findPlayer();
    if (currentPlayer && ![MenuState.CreateAccount, MenuState.Loading, MenuState.Lobbies, MenuState.Login, MenuState.Menu, MenuState.Settings].includes(this.appStateService.menuState))
    {
      if (currentPlayer.alive)
        this.appStateService.menuState = MenuState.Playing;
      else if (!currentPlayer.alive)
        this.appStateService.menuState = MenuState.Respawning;
    }


    if (currentPlayer) {
      var inventory = currentPlayer.inventory;
      this.graphics.setInventory(inventory);
    }
  }

  updateScoreboard(): void {
    this.graphics.setLeaderboard(this.players, this.socketService.getSocketId());

    const timeToParse = this.status == Constants.GAME_STATUS_NOT_STARTED ?
      Constants.GAMEPLAY_TIMER :
      this.status == Constants.GAME_STATUS_FINISHED ?
        0 :
        this.time;

    this.graphics.setTime(timeToParse);
  }

  updateGameInfo(): void {
    switch (this.status) {
      case (Constants.GAME_STATUS_PLAYING):
        this.appStateService.gameState = GameState.Playing;
        break;
      case (Constants.GAME_STATUS_NOT_STARTED):
        this.appStateService.gameState = GameState.Starting;
        break;
      case (Constants.GAME_STATUS_FINISHED):
        this.appStateService.gameState = GameState.Finished;
        break;
    }
  }

  updateMobs(mobs: string) {
    const listOfChanges = mobs.split(';');
    listOfChanges.forEach(mobChange => {
      const changeInfo = mobChange.split(':');
      if (changeInfo.length == 3 && changeInfo[2] === '0') {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const newTile = 0;
        if (this.map.mobs)
          this.map.mobs[x][y] = newTile;
      } else if (changeInfo.length == 5) {
        const x = changeInfo[0];
        const y = changeInfo[1];
        const id = changeInfo[2];
        const value = changeInfo[3];
        const owner = changeInfo[4];

        if (this.map.mobs)
          this.map.mobs[x][y] = { id, value: parseInt(value), owner: owner === '0' ? null : owner }
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
        if (this.map.objects)
          this.map.objects[x][y] = parseInt(newTile);
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
        if (this.map.terrain)
          this.map.terrain[x][y] = parseInt(newTile);
      }
    });
  }

  updateEndGameInfo(): void {
    this.graphics.showResultsPanel(this.players, this.eloResults, this.socketService.getSocketId());
  }

  resetEndGameInfo(): void {
    this.graphics.hideResults();
    this.eloResults = null;
  }

  private findPlayerCoordinates(): number[] {
    var width = this.map.terrain.length;
    var height = this.map.terrain[0].length;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = this.map.mobs[x][y];
        if (tile && this.tileIsPlayer(tile) && tile.id === this.socketService.getSocketId()) {
          return [x, y];
        }
      }
    }
    return null;
  }

  private tileIsPlayer(tile: any) {
    return tile?.value === Constants.MOB_PLAYER_UP ||
      tile?.value === Constants.MOB_PLAYER_DOWN ||
      tile?.value === Constants.MOB_PLAYER_RIGHT ||
      tile?.value === Constants.MOB_PLAYER_LEFT;
  }


  private findPlayer(): Player {
    return this.players.filter(player => {
      return player.id === this.socketService.getSocketId();
    })[0];
  }
}
