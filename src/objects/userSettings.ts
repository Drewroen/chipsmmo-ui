import { Injectable } from '@angular/core';
import { Constants } from 'src/constants/constants';
import { UserControls } from './userControls';

@Injectable()
export class UserSettings {
  controls: UserControls;

  constructor(controls: UserControls)
  {
    this.controls = controls;

    try
    {
      let localSettings = JSON.parse(localStorage.getItem('user_settings')) as UserSettings;
      this.setControls(localSettings.controls);
      if (!this.allControlsAreSet())
      {
        this.resetControls();
      }
    } catch { }
    this.updateLocalStorage();
  }

  public allControlsAreSet(): boolean
  {
    return this.controls.up != null &&
    this.controls.down != null &&
    this.controls.left != null &&
    this.controls.right != null &&
    this.controls.throwBowlingBall != null &&
    this.controls.callWhistle!= null ;
  }

  private resetControls()
  {
    this.controls.up = Constants.DEFAULT_KEY_UP_ARROW;
    this.controls.down = Constants.DEFAULT_KEY_DOWN_ARROW;
    this.controls.left = Constants.DEFAULT_KEY_LEFT_ARROW;
    this.controls.right = Constants.DEFAULT_KEY_RIGHT_ARROW;
    this.controls.throwBowlingBall = Constants.DEFAULT_KEY_THROW_BOWLING_BALL;
    this.controls.callWhistle = Constants.DEFAULT_KEY_CALL_WHISTLE;
  }

  public setControls(controls: UserControls)
  {
    this.controls.up = controls.up;
    this.controls.down = controls.down;
    this.controls.left = controls.left;
    this.controls.right = controls.right;
    this.controls.throwBowlingBall = controls.throwBowlingBall;
    this.controls.callWhistle = controls.callWhistle;
  }

  public getCurrentKeyBeingSet(): string {
    return this.controls.currentKeyBeingSet;
  }

  public setCurrentKeyBeingSet(key: string): void {
    this.controls.currentKeyBeingSet = key;
  }

  public thisKeyIsActive(key): boolean {
    return key === this.getCurrentKeyBeingSet();
  }

  public resetDefaultControls() {
    this.resetControls();
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('user_settings', JSON.stringify(this));
  }
}
