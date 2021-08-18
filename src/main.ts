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
  Input,
  GameEvent,
} from "excalibur";
import { Resources } from "./resources";
import { Planet, PlanetArgs } from "./planet";

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }
  initialize() {
    // ------ UI
    const planetsInfo = new Label({text: "info", pos: new Vector(100,10)});
    planetsInfo.enableCapturePointer = true;
    planetsInfo.on("pointerenter", e => {console.log("desperate")});
    this.add(planetsInfo);

    // ----- Planets
    const rand = new Random();
    const numberOfPlanets = rand.integer(1, 5);

    planetsInfo.text = `This system has ${numberOfPlanets} planets`;

    // Random system =)
    for (let i = 1; i < numberOfPlanets + 1; i++) {
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
      this.add(p);
    }

    const loader = new Loader([Resources.Sword]);
    this.start(loader);
  }
}

export const game = new Game();

//game.input.pointers.on("down", e => {console.log("yo")}); // ← works!

game.initialize();
