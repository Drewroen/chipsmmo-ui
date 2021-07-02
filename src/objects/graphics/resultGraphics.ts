declare var PIXI: any;

export class ResultGraphics {
  public panel: any;
  public topPlayers: any[];
  public player: any;

  constructor() {
    this.panel = new PIXI.Sprite();
    this.panel.x = 127;
    this.panel.y = 0;
    this.panel.texture = null;
    this.topPlayers = [];

    for (let i = 0; i < 8; i++) {
      const playerScoreGraphic = new PIXI.Text('', { font: '60px Arial', fill: 0x000000, fontWeight: 600 });
      playerScoreGraphic.x = 268;
      playerScoreGraphic.y = 128 + (i * 22);
      playerScoreGraphic.scale.x = .3;
      playerScoreGraphic.scale.y = .3;
      playerScoreGraphic.anchor.set(0.5);
      this.topPlayers.push(playerScoreGraphic);
    }

    const playerGraphic = new PIXI.Text('', { font: '72px Arial', fill: 0x000000, fontWeight: 600 });
    playerGraphic.x = 268;
    playerGraphic.y = 336;
    playerGraphic.scale.x = .3;
    playerGraphic.scale.y = .3;
    playerGraphic.anchor.set(0.5);
    this.player = playerGraphic;
  }
}
