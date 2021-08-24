import {
  Actor,
  ActorArgs,
  Color,
  GameEvent,
  Graphics,
  Label,
  Shape,
  vec,
} from "excalibur";
import { Game } from "../main";
import { Planet } from "../models/Planet";
import { OrbitViewScene } from "../scenes/OrbitViewScene";
import { StateManager } from "../state/StateManager";
import { ColorPalette } from "../utils/colorPalette";

export class ToOrbitViewEvent extends GameEvent<any> {
  viewName: string;

  constructor() {
    super();
    this.viewName = OrbitViewScene.getViewKey();
  }
}

export interface PlanetActorArgs extends ActorArgs {
  planet: Planet;
  radius: number;
}

export class PlanetActor extends Actor {
  public planet: Planet;
  public radius: number;
  labelActor: Label;

  constructor(opts: PlanetActorArgs) {
    super(opts);
    this.planet = this.planet;

    this.color = ColorPalette.PlanetBlue;
    this.body.collider.shape = Shape.Circle(this.radius);
  }

  toString() {
    return `Planet ${this.planet.name} of type ${this.planet.type}`;
  }

  onInitialize() {
    const planetShape = new Graphics.Circle({
      radius: this.radius,
      color: this.color,
    });

    this.graphics.add(planetShape);

    this.enableCapturePointer = true;

    // ----- Events for this actor
    this.on("pointerenter", () => {
      const at = new Label({
        text: this.toString(),
        pos: vec(this.pos.x + 30, this.pos.y + 30),
      });

      at.color = Color.Orange;

      this.labelActor = at;

      this.scene.engine.currentScene.add(at);
      this.scene.engine.eventDispatcher.emit("yo", new GameEvent());
    });

    this.on("pointerleave", () => {
      this.scene.engine.remove(this.labelActor);
    });

    this.on("pointerup", () => {
      StateManager.getInstance().setCurrentPlanet(this.planet);
      this.scene.engine.emit("to_scene", new GameEvent<PlanetActor>());
    });
  }
}
