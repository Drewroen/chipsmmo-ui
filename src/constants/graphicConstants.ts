import { Constants } from './constants';

declare var PIXI: any;

export class GraphicConstants {
  public static terrain: Map<number, any> = new Map([
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

  public static object: Map<number, any> = new Map([
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
    [Constants.OBJECT_BOWLING_BALL, PIXI.Texture.from('./../assets/CC_TILE_91_BOWLING_BALL.png')],
    [Constants.OBJECT_WHISTLE, PIXI.Texture.from('./../assets/CC_TILE_95_WHISTLE.png')]
  ]);

  public static mob: Map<number, any> = new Map([
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
    [Constants.MOB_BOWLING_BALL, PIXI.Texture.from('./../assets/CC_TILE_91_BOWLING_BALL.png')],
    [Constants.MOB_BLOCK_BROKEN, PIXI.Texture.from('./../assets/CC_TILE_94_BROKEN_BLOCK.png')]
  ]);

  public static ownership: Map<number, any> = new Map([
    [Constants.OWNER_GREEN, PIXI.Texture.from('./../assets/CC_TILE_92_TEAM_GREEN.png')],
    [Constants.OWNER_RED, PIXI.Texture.from('./../assets/CC_TILE_93_TEAM_RED.png')],
  ]);

  public static inventory: Map<number, any> = new Map([
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

  public static timeAssets: Map<string, any> = new Map([
    ['GREEN_0', PIXI.Texture.from('./../assets/DIGIT_0_GREEN.png')],
    ['YELLOW_0', PIXI.Texture.from('./../assets/DIGIT_0_YELLOW.png')],
    ['GREEN_1', PIXI.Texture.from('./../assets/DIGIT_1_GREEN.png')],
    ['YELLOW_1', PIXI.Texture.from('./../assets/DIGIT_1_YELLOW.png')],
    ['GREEN_2', PIXI.Texture.from('./../assets/DIGIT_2_GREEN.png')],
    ['YELLOW_2', PIXI.Texture.from('./../assets/DIGIT_2_YELLOW.png')],
    ['GREEN_3', PIXI.Texture.from('./../assets/DIGIT_3_GREEN.png')],
    ['YELLOW_3', PIXI.Texture.from('./../assets/DIGIT_3_YELLOW.png')],
    ['GREEN_4', PIXI.Texture.from('./../assets/DIGIT_4_GREEN.png')],
    ['YELLOW_4', PIXI.Texture.from('./../assets/DIGIT_4_YELLOW.png')],
    ['GREEN_5', PIXI.Texture.from('./../assets/DIGIT_5_GREEN.png')],
    ['YELLOW_5', PIXI.Texture.from('./../assets/DIGIT_5_YELLOW.png')],
    ['GREEN_6', PIXI.Texture.from('./../assets/DIGIT_6_GREEN.png')],
    ['YELLOW_6', PIXI.Texture.from('./../assets/DIGIT_6_YELLOW.png')],
    ['GREEN_7', PIXI.Texture.from('./../assets/DIGIT_7_GREEN.png')],
    ['YELLOW_7', PIXI.Texture.from('./../assets/DIGIT_7_YELLOW.png')],
    ['GREEN_8', PIXI.Texture.from('./../assets/DIGIT_8_GREEN.png')],
    ['YELLOW_8', PIXI.Texture.from('./../assets/DIGIT_8_YELLOW.png')],
    ['GREEN_9', PIXI.Texture.from('./../assets/DIGIT_9_GREEN.png')],
    ['YELLOW_9', PIXI.Texture.from('./../assets/DIGIT_9_YELLOW.png')],
    ['GREEN_EMPTY', PIXI.Texture.from('./../assets/DIGIT_EMPTY_GREEN.png')],
    ['YELLOW_EMPTY', PIXI.Texture.from('./../assets/DIGIT_EMPTY_YELLOW.png')],
  ]);

  public static gameAssets: Map<string, any> = new Map([
    ['SIDE_PANEL', PIXI.Texture.from('./../assets/SIDE_PANEL.png')],
    ['MAIN_PANEL', PIXI.Texture.from('./../assets/MAIN_PANEL.png')],
    ['ENDGAME_PANEL', PIXI.Texture.from('./../assets/GAME_OVER_PANEL.png')]
  ])
}
