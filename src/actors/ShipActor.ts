import { Actor, ActorArgs, Color, Graphics, vec } from "excalibur";
import { Ship } from "../models/Ship";

export interface ShipActorArgs extends ActorArgs {
  ship: Ship;
}

export class ShipActor extends Actor {
  constructor(opts: ShipActorArgs) {
    super(opts);
  }

  onInitialize() {
    const scale = 3;

    const shipShape = new Graphics.GraphicsGroup({
      members: [
        {
          graphic: new Graphics.Polygon({
            points: [
              vec(10 * scale, 0),
              vec(0, 20 * scale),
              vec(20 * scale, 20 * scale),
            ],
            color: Color.LightGray,
          }),
          pos: vec(0, 0),
        },
        {
          graphic: new Graphics.Rectangle({
            height: 30 * scale,
            width: 20 * scale,
            color: Color.LightGray,
          }),
          pos: vec(0 * scale, 20 * scale),
        },
      ],
    });

    shipShape.rotation = 1;

    this.graphics.add(shipShape);
  }
}
