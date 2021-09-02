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
  scaleFactor: number;
}

export class PlanetActor extends Actor {
  public planet: Planet;
  labelActor: Label;
  scaleFactor: number;

  constructor(opts: PlanetActorArgs) {
    super(opts);
    this.planet = opts.planet;
    this.scaleFactor = opts.scaleFactor;

    this.color = ColorPalette.PlanetBlue;
    this.body.collider.shape = Shape.Circle(this.planet.radius);
  }

  toString() {
    return `Planet ${this.planet.name} of type ${this.planet.type}.`;
  }

  onInitialize() {
    console.log(this.planet.resources);

    const planetShape = new Graphics.Circle({
      radius: this.planet.radius * this.scaleFactor,
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
      const sm = StateManager.getInstance();
      sm.setCurrentPlanet(this.planet);
      const ship = sm.getState().ship;
      ship.orbitingPlanet = this.planet;
      sm.setShip(ship);
      console.log(sm.getState());
      this.scene.engine.emit("to_scene", new GameEvent<PlanetActor>());
    });
  }
}
