import {
  Actor,
  Color,
  DisplayMode,
  Engine,
  Loader,
  vec,
  Graphics,
  ActorArgs,
  Vector,
  Random,
  Label,
} from "excalibur";
import { Resources } from "./resources";
import { Planet, PlanetArgs } from "./planet";

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }
  initialize() {
    const rand = new Random();
    const numberOfPlanets = rand.integer(1, 5);

    // Random system =)
    for (let i = 1; i < numberOfPlanets; i++) {
      const radius = rand.integer(10, 100);
      const pArgs: PlanetArgs = {
        pos: new Vector(500, 100 * i),
        radius: radius,
        color: rand.pickOne([
          Color.Orange,
          Color.Gray,
          Color.Red,
          Color.Rose,
          Color.Violet,
          Color.Green,
          Color.DarkGray,
        ]),
      };

      const p = new Planet(pArgs);      
      p.on("pointerenter", e => {console.log("this is a planet")});
      p.on("pointerdown", e => {console.log("this is a planet")});
      this.add(p);
    }

    const loader = new Loader([Resources.Sword]);
    this.start(loader);
  }
}

export const game = new Game();

game.initialize();
