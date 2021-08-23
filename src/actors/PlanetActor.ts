import {
  Actor,
  ActorArgs,
  Color,
  GameEvent,
  Graphics,
  Shape,
  vec,
} from "excalibur";
import { Game } from "../main";
import { Planet } from "../models/Planet";
import { OrbitViewScene } from "../scenes/OrbitViewScene";
import { StateManager } from "../state/StateManager";
import { ColorPalette } from "../utils/colorPalette";

export class ToOrbitViewEvent extends GameEvent<PlanetActor> {}

export interface PlanetActorArgs extends ActorArgs {
  planet: Planet;
  radius: number;
}

export class PlanetActor extends Actor {
  public planet: Planet;
  public radius: number;
  public name: string;
  public game: Game;

  constructor(opts: PlanetActorArgs, game: Game) {
    super(opts);
    this.planet = this.planet;
    this.name = this.planet.name;

    this.color = ColorPalette.PlanetBlue;
    this.body.collider.shape = Shape.Circle(this.radius);

    this.game = game;
  }

  toString() {
    return `Planet ${this.name}`;
  }

  onInitialize() {
    const planetShape = new Graphics.Circle({
      radius: this.radius,
      color: this.color,
    });

    const hexa = new Graphics.Rectangle({
      height: 20,
      width: 20,
    });

    this.graphics.add("shape", planetShape);
    this.graphics.add("hexa", hexa);

    this.graphics.hide("hexa");
    this.graphics.show("shape");

    this.enableCapturePointer = true;

    this.on("pointerenter", () => {
      console.log("enter");
      this.graphics.show("hexa");
    });

    this.on("pointerleave", () => {
      this.graphics.hide("hexa");
    });

    this.on("pointerup", () => {
      StateManager.getInstance().setCurrentPlanet(this.name);
      this.game.goToScene(OrbitViewScene.getViewKey());
    });
  }
}
