import { Actor, ActorArgs, Graphics, vec } from "excalibur";
import { Ship } from "../models/Ship";

export interface ShipActorArgs extends ActorArgs {
    ship: Ship;
}

export class ShipActor extends Actor {
  constructor(opts: ShipActorArgs) {
    super(opts);
  }

  onInitialize() {
    const shipShape = new Graphics.GraphicsGroup({
      members: [
        {
          graphic: new Graphics.Polygon({
            points: [vec(10 * 5, 0), vec(0, 20 * 5), vec(20 * 5, 20 * 5)],
          }),
          pos: vec(50, 50),
        },
      ],
    });
    
    this.graphics.add(shipShape);
  }
}
