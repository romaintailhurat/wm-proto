import { Actor, ActorArgs, GameEvent, Graphics, Random, Shape } from "excalibur";
import { Game } from "../main";
import { Planet } from "../models/Planet";
import { OrbitViewScene } from "../scenes/OrbitViewScene";
import { StateManager } from "../state/StateManager";
import { randomName } from "../utils/name";


export class ToOrbitViewEvent extends GameEvent<PlanetActor>{}

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

    this.graphics.add(planetShape);

    this.enableCapturePointer = true;

    this.on("pointerenter", () => {
      //console.log(this.toString());
    });

    this.on("pointerup", () => {
      StateManager.getInstance().setCurrentPlanet(this.name);
      this.game.goToScene(OrbitViewScene.getViewKey());
    });
  }
}
