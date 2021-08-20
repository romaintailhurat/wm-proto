import { Actor, ActorArgs, GameEvent, Graphics, Random, Shape } from "excalibur";
import { Game } from "./main";
import { OrbitViewScene } from "./scenes/OrbitViewScene";
import { StateManager } from "./state/StateManager";

const randomName = (): string => {
  const rand = new Random();
  const cons = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "z",
  ];
  const vows = ["a", "e", "i", "o", "u", "y"];
  const len = rand.integer(4, 10);
  let name = "";
  for (let i = 0; i < len; i++) {
    const isVowel = rand.bool(0.4);
    if (isVowel) {
      name = name + rand.pickOne(vows);
    } else {
      name = name + rand.pickOne(cons);
    }
  }
  return name;
};

export class ToOrbitViewEvent extends GameEvent<Planet>{}

export interface PlanetArgs extends ActorArgs {
  radius: number;
}

export class Planet extends Actor {
  public radius: number;
  public name: string;
  public game: Game;

  constructor(opts: PlanetArgs, game: Game) {
    super(opts);
    this.name = randomName();
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
