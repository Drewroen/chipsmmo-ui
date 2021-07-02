import { Constants } from 'src/constants/constants';
import { GraphicConstants } from 'src/constants/graphicConstants';

declare var PIXI: any;

export class AssetGraphics {
  public mainPanel: any;
  public sidePanel: any;

  constructor() {
    this.mainPanel = new PIXI.Sprite(GraphicConstants.gameAssets.get('MAIN_PANEL'));
    this.mainPanel.x = 0;
    this.mainPanel.y = 35;

    this.sidePanel = new PIXI.Sprite(GraphicConstants.gameAssets.get('SIDE_PANEL'));
    this.sidePanel.x = Constants.MAIN_PANEL_SIZE + 13;
    this.sidePanel.y = 35;
  }
}
