export class Player {
    id: string;
    name: string;
    score: number;
    alive: boolean;
    inventory: Inventory;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.score = 0;
        this.alive = true;
        this.inventory = new Inventory();
    }
}

export class Inventory {
  redKeys: number;
  yellowKeys: number;
  blueKeys: number;
  greenKey: boolean;
  flippers: boolean;
  forceBoots: boolean;
  fireBoots: boolean;
  iceSkates: boolean;

  constructor()
  {
    this.redKeys = 0;
    this.yellowKeys = 0;
    this.blueKeys = 0;
    this.greenKey = false;
    this.flippers = false;
    this.forceBoots = false;
    this.fireBoots = false;
    this.iceSkates = false;
  }
}
