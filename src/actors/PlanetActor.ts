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

export class ToOrbitViewEvent extends GameEvent<PlanetActor> {}

export interface PlanetActorArgs extends ActorArgs {
  planet: Planet;
  radius: number;
}

export class PlanetActor extends Actor {
  public planet: Planet;
  public radius: number;
  public game: Game;
  labelActor: Label;

  constructor(opts: PlanetActorArgs, game: Game) {
    super(opts);
    this.planet = this.planet;

    this.color = ColorPalette.PlanetBlue;
    this.body.collider.shape = Shape.Circle(this.radius);

    this.game = game;
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

    this.on("pointerenter", () => {
      const at = new Label({
        text: this.toString(),
        pos: vec(this.pos.x + 30, this.pos.y + 30),
      });

      at.color = Color.Orange;

      this.labelActor = at;

      this.game.currentScene.add(at);
      this.game.eventDispatcher.emit("yo", new GameEvent());
    });

    this.on("pointerleave", () => {
      this.game.remove(this.labelActor);
    });

    this.on("pointerup", () => {
      StateManager.getInstance().setCurrentPlanet(this.name);
      this.game.goToScene(OrbitViewScene.getViewKey());
    });
  }
}
