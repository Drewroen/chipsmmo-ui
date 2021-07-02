import { Player } from './player';

export class GameInformation {
  public players: Player[];
  public time: any;
  public status: any;

  constructor()
  {
    this.players = [];
  }
}
