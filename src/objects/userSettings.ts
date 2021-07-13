import { Constants } from 'src/constants/constants';

export class UserSettings {
  controls: UserControls;

  constructor()
  {
    this.controls = new UserControls();
  }
}

export class UserControls {
  up: string;
  down: string;
  left: string;
  right: string;
  throwBowlingBall: string;
  callWhistle: string;

  constructor()
  {
    this.up = Constants.DEFAULT_KEY_UP_ARROW;
    this.down = Constants.DEFAULT_KEY_DOWN_ARROW;
    this.left = Constants.DEFAULT_KEY_LEFT_ARROW;
    this.right = Constants.DEFAULT_KEY_RIGHT_ARROW;
    this.throwBowlingBall = Constants.DEFAULT_KEY_THROW_BOWLING_BALL;
    this.callWhistle = Constants.DEFAULT_KEY_CALL_WHISTLE;
  }
}
