import { Constants } from './constants';

declare var PIXI: any;

export class GraphicConstants {
  public static terrain: Map<number, any> = new Map([
    [Constants.TERRAIN_FLOOR, GraphicConstants.generateTileTexture(0, 0)],
    [Constants.TERRAIN_WALL, GraphicConstants.generateTileTexture(1, 0)],
    [Constants.TERRAIN_THIN_WALL_UP, GraphicConstants.generateTileTexture(2, 0)],
    [Constants.TERRAIN_THIN_WALL_LEFT, GraphicConstants.generateTileTexture(3, 0)],
    [Constants.TERRAIN_THIN_WALL_DOWN, GraphicConstants.generateTileTexture(4, 0)],
    [Constants.TERRAIN_THIN_WALL_RIGHT, GraphicConstants.generateTileTexture(5, 0)],
    [Constants.TERRAIN_THIN_WALL_DOWN_RIGHT, GraphicConstants.generateTileTexture(6, 0)],

    [Constants.TERRAIN_GRAVEL, GraphicConstants.generateTileTexture(0, 1)],
    [Constants.TERRAIN_DIRT, GraphicConstants.generateTileTexture(1, 1)],
    [Constants.TERRAIN_WATER, GraphicConstants.generateTileTexture(2, 1)],
    [Constants.TERRAIN_FIRE, GraphicConstants.generateTileTexture(3, 1)],
    [Constants.TERRAIN_BLUE_WALL_FAKE, GraphicConstants.generateTileTexture(4, 1)],
    [Constants.TERRAIN_BLUE_WALL_REAL, GraphicConstants.generateTileTexture(4, 1)],
    [Constants.TERRAIN_THIEF, GraphicConstants.generateTileTexture(5, 1)],
    [Constants.TERRAIN_CELL_BLOCK, GraphicConstants.generateTileTexture(6, 1)],

    [Constants.TERRAIN_FORCE_UP, GraphicConstants.generateTileTexture(0, 2)],
    [Constants.TERRAIN_FORCE_LEFT, GraphicConstants.generateTileTexture(1, 2)],
    [Constants.TERRAIN_FORCE_DOWN, GraphicConstants.generateTileTexture(2, 2)],
    [Constants.TERRAIN_FORCE_RIGHT, GraphicConstants.generateTileTexture(3, 2)],
    [Constants.TERRAIN_FORCE_RANDOM, GraphicConstants.generateTileTexture(4, 2)],
    [Constants.TERRAIN_BLUE_KEY_DOOR, GraphicConstants.generateTileTexture(5, 2)],
    [Constants.TERRAIN_GREEN_KEY_DOOR, GraphicConstants.generateTileTexture(6, 2)],

    [Constants.TERRAIN_ICE_CORNER_RIGHT_DOWN, GraphicConstants.generateTileTexture(0, 3)],
    [Constants.TERRAIN_ICE_CORNER_DOWN_LEFT, GraphicConstants.generateTileTexture(1, 3)],
    [Constants.TERRAIN_ICE_CORNER_LEFT_UP, GraphicConstants.generateTileTexture(2, 3)],
    [Constants.TERRAIN_ICE_CORNER_UP_RIGHT, GraphicConstants.generateTileTexture(3, 3)],
    [Constants.TERRAIN_ICE, GraphicConstants.generateTileTexture(4, 3)],
    [Constants.TERRAIN_RED_KEY_DOOR, GraphicConstants.generateTileTexture(5, 3)],
    [Constants.TERRAIN_YELLOW_KEY_DOOR, GraphicConstants.generateTileTexture(6, 3)],

    [Constants.TERRAIN_TOGGLE_WALL_CLOSED, GraphicConstants.generateTileTexture(0, 4)],
    [Constants.TERRAIN_TOGGLE_WALL_OPEN, GraphicConstants.generateTileTexture(1, 4)],
    [Constants.TERRAIN_CLONE_MACHINE, GraphicConstants.generateTileTexture(2, 4)],
    [Constants.TERRAIN_TRAP, GraphicConstants.generateTileTexture(3, 4)],
    [Constants.TERRAIN_TELEPORT, GraphicConstants.generateTileTexture(4, 4)],

    [Constants.TERRAIN_TOGGLE_BUTTON, GraphicConstants.generateTileTexture(0, 5)],
    [Constants.TERRAIN_TANK_TOGGLE_BUTTON, GraphicConstants.generateTileTexture(1, 5)],
    [Constants.TERRAIN_CLONE_BUTTON, GraphicConstants.generateTileTexture(2, 5)],
    [Constants.TERRAIN_TRAP_BUTTON, GraphicConstants.generateTileTexture(3, 5)]
  ]);

  public static object: Map<number, any> = new Map([
    [Constants.OBJECT_CHIP, GraphicConstants.generateTileTexture(2, 13)],
    [Constants.OBJECT_BOMB, GraphicConstants.generateTileTexture(2, 12)],
    [Constants.OBJECT_BLUE_KEY, GraphicConstants.generateTileTexture(0, 12)],
    [Constants.OBJECT_RED_KEY, GraphicConstants.generateTileTexture(0, 13)],
    [Constants.OBJECT_GREEN_KEY, GraphicConstants.generateTileTexture(0, 14)],
    [Constants.OBJECT_YELLOW_KEY, GraphicConstants.generateTileTexture(0, 15)],
    [Constants.OBJECT_FIRE_BOOTS, GraphicConstants.generateTileTexture(1, 13)],
    [Constants.OBJECT_FLIPPERS, GraphicConstants.generateTileTexture(1, 12)],
    [Constants.OBJECT_ICE_SKATES, GraphicConstants.generateTileTexture(1, 14)],
    [Constants.OBJECT_SUCTION_BOOTS, GraphicConstants.generateTileTexture(1, 15)],
    [Constants.OBJECT_BOWLING_BALL, GraphicConstants.generateTileTexture(2, 14)],
    [Constants.OBJECT_WHISTLE, GraphicConstants.generateTileTexture(2, 15)]
  ]);

  public static mob: Map<number, any> = new Map([
    [Constants.MOB_PLAYER_UP, GraphicConstants.generateTileTexture(7, 7)],
    [Constants.MOB_PLAYER_RIGHT, GraphicConstants.generateTileTexture(7, 10)],
    [Constants.MOB_PLAYER_DOWN, GraphicConstants.generateTileTexture(7, 9)],
    [Constants.MOB_PLAYER_LEFT, GraphicConstants.generateTileTexture(7, 8)],
    [Constants.MOB_OPPONENT_UP, GraphicConstants.generateTileTexture(8, 7)],
    [Constants.MOB_OPPONENT_RIGHT, GraphicConstants.generateTileTexture(8, 10)],
    [Constants.MOB_OPPONENT_DOWN, GraphicConstants.generateTileTexture(8, 9)],
    [Constants.MOB_OPPONENT_LEFT, GraphicConstants.generateTileTexture(8, 8)],
    [Constants.MOB_BALL, GraphicConstants.generateTileTexture(0, 9)],
    [Constants.MOB_FIREBALL, GraphicConstants.generateTileTexture(0, 8)],
    [Constants.MOB_GLIDER_UP, GraphicConstants.generateTileTexture(4, 7)],
    [Constants.MOB_GLIDER_RIGHT, GraphicConstants.generateTileTexture(4, 10)],
    [Constants.MOB_GLIDER_DOWN, GraphicConstants.generateTileTexture(4, 9)],
    [Constants.MOB_GLIDER_LEFT, GraphicConstants.generateTileTexture(4, 8)],
    [Constants.MOB_WALKER_UP_DOWN, GraphicConstants.generateTileTexture(6, 9)],
    [Constants.MOB_WALKER_LEFT_RIGHT, GraphicConstants.generateTileTexture(6, 10)],
    [Constants.MOB_PAREMECIUM_UP_DOWN, GraphicConstants.generateTileTexture(6, 7)],
    [Constants.MOB_PAREMECIUM_LEFT_RIGHT, GraphicConstants.generateTileTexture(6, 8)],
    [Constants.MOB_BUG_UP, GraphicConstants.generateTileTexture(3, 7)],
    [Constants.MOB_BUG_RIGHT, GraphicConstants.generateTileTexture(3, 10)],
    [Constants.MOB_BUG_DOWN, GraphicConstants.generateTileTexture(3, 9)],
    [Constants.MOB_BUG_LEFT, GraphicConstants.generateTileTexture(3, 8)],
    [Constants.MOB_BLOB, GraphicConstants.generateTileTexture(0, 7)],
    [Constants.MOB_TEETH_UP, GraphicConstants.generateTileTexture(2, 7)],
    [Constants.MOB_TEETH_RIGHT, GraphicConstants.generateTileTexture(2, 10)],
    [Constants.MOB_TEETH_DOWN, GraphicConstants.generateTileTexture(2, 9)],
    [Constants.MOB_TEETH_LEFT, GraphicConstants.generateTileTexture(2, 8)],
    [Constants.MOB_TANK_UP, GraphicConstants.generateTileTexture(5, 7)],
    [Constants.MOB_TANK_RIGHT, GraphicConstants.generateTileTexture(5, 10)],
    [Constants.MOB_TANK_DOWN, GraphicConstants.generateTileTexture(5, 9)],
    [Constants.MOB_TANK_LEFT, GraphicConstants.generateTileTexture(5, 8)],
    [Constants.MOB_BLOCK, GraphicConstants.generateTileTexture(1, 7)],
    [Constants.MOB_PLAYER_UP_SWIM, GraphicConstants.generateTileTexture(9, 7)],
    [Constants.MOB_PLAYER_RIGHT_SWIM, GraphicConstants.generateTileTexture(9, 10)],
    [Constants.MOB_PLAYER_DOWN_SWIM, GraphicConstants.generateTileTexture(9, 9)],
    [Constants.MOB_PLAYER_LEFT_SWIM, GraphicConstants.generateTileTexture(9, 8)],
    [Constants.MOB_OPPONENT_UP_SWIM, GraphicConstants.generateTileTexture(10, 7)],
    [Constants.MOB_OPPONENT_RIGHT_SWIM, GraphicConstants.generateTileTexture(10, 10)],
    [Constants.MOB_OPPONENT_DOWN_SWIM, GraphicConstants.generateTileTexture(10, 9)],
    [Constants.MOB_OPPONENT_LEFT_SWIM, GraphicConstants.generateTileTexture(10, 8)],
    [Constants.MOB_BOWLING_BALL, GraphicConstants.generateTileTexture(2, 14)],
    [Constants.MOB_BLOCK_BROKEN, GraphicConstants.generateTileTexture(1, 8)],
    [Constants.MOB_BLOCK_BROKEN_2, GraphicConstants.generateTileTexture(1, 9)]
  ]);

  public static ownership: Map<number, any> = new Map([
    [Constants.OWNER_GREEN, GraphicConstants.generateTileTexture(12, 15)],
    [Constants.OWNER_RED, GraphicConstants.generateTileTexture(12, 15)],
  ]);

  public static inventory: Map<number, any> = new Map([
    [Constants.OBJECT_BLUE_KEY, GraphicConstants.generateTileTexture(0, 12)],
    [Constants.OBJECT_RED_KEY, GraphicConstants.generateTileTexture(0, 13)],
    [Constants.OBJECT_GREEN_KEY, GraphicConstants.generateTileTexture(0, 14)],
    [Constants.OBJECT_YELLOW_KEY, GraphicConstants.generateTileTexture(0, 15)],
    [Constants.OBJECT_FIRE_BOOTS, GraphicConstants.generateTileTexture(1, 13)],
    [Constants.OBJECT_FLIPPERS, GraphicConstants.generateTileTexture(1, 12)],
    [Constants.OBJECT_ICE_SKATES, GraphicConstants.generateTileTexture(1, 14)],
    [Constants.OBJECT_SUCTION_BOOTS, GraphicConstants.generateTileTexture(1, 15)],
    [Constants.OBJECT_BOWLING_BALL, GraphicConstants.generateTileTexture(2, 14)],
    [Constants.OBJECT_WHISTLE, GraphicConstants.generateTileTexture(2, 15)]
  ]);

  public static timeAssets: Map<string, any> = new Map([
    ['GREEN_0', GraphicConstants.generateNumberTexture(0, 0)],
    ['YELLOW_0', GraphicConstants.generateNumberTexture(0, 1)],
    ['GREEN_1', GraphicConstants.generateNumberTexture(1, 0)],
    ['YELLOW_1', GraphicConstants.generateNumberTexture(1, 1)],
    ['GREEN_2', GraphicConstants.generateNumberTexture(2, 0)],
    ['YELLOW_2', GraphicConstants.generateNumberTexture(2, 1)],
    ['GREEN_3', GraphicConstants.generateNumberTexture(3, 0)],
    ['YELLOW_3', GraphicConstants.generateNumberTexture(3, 1)],
    ['GREEN_4', GraphicConstants.generateNumberTexture(4, 0)],
    ['YELLOW_4', GraphicConstants.generateNumberTexture(4, 1)],
    ['GREEN_5', GraphicConstants.generateNumberTexture(5, 0)],
    ['YELLOW_5', GraphicConstants.generateNumberTexture(5, 1)],
    ['GREEN_6', GraphicConstants.generateNumberTexture(6, 0)],
    ['YELLOW_6', GraphicConstants.generateNumberTexture(6, 1)],
    ['GREEN_7', GraphicConstants.generateNumberTexture(7, 0)],
    ['YELLOW_7', GraphicConstants.generateNumberTexture(7, 1)],
    ['GREEN_8', GraphicConstants.generateNumberTexture(8, 0)],
    ['YELLOW_8', GraphicConstants.generateNumberTexture(8, 1)],
    ['GREEN_9', GraphicConstants.generateNumberTexture(9, 0)],
    ['YELLOW_9', GraphicConstants.generateNumberTexture(9, 1)],
    ['GREEN_EMPTY', GraphicConstants.generateNumberTexture(10, 0)],
    ['YELLOW_EMPTY', GraphicConstants.generateNumberTexture(10, 1)],
  ]);

  public static gameAssets: Map<string, any> = new Map([
    ['SIDE_PANEL', PIXI.Texture.from('./../assets/SIDE_PANEL.png')],
    ['MAIN_PANEL', PIXI.Texture.from('./../assets/MAIN_PANEL.png')],
    ['ENDGAME_PANEL', PIXI.Texture.from('./../assets/GAME_OVER_PANEL.png')]
  ]);

  private static generateTileTexture(x: number, y: number)
  {
    let base = new PIXI.Texture.from('./../assets/TILESET.png');
    let texture = new PIXI.Texture(base.baseTexture, new PIXI.Rectangle(32 * x, 32 * y, 32, 32));
    return texture;
  }

  private static generateNumberTexture(x: number, y: number)
  {
    let base = new PIXI.Texture.from('./../assets/TIME_DIGITS.png');
    let texture = new PIXI.Texture(base.baseTexture, new PIXI.Rectangle(13 * x, 21 * y, 13, 21));
    return texture;
  }
}
