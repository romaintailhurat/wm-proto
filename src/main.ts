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
import { PlanetActor, PlanetActorArgs, ToOrbitViewEvent } from "./actors/PlanetActor";
import { SystemViewScene } from "./scenes/SystemViewScene";
import { OrbitViewScene } from "./scenes/OrbitViewScene";
import { Planet } from "./models/Planet";

export class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }

  initialize() {
    

    // ------ UI
    const planetsInfo = new Label({ text: "info", pos: new Vector(100, 10) });
    this.add(planetsInfo);

    // ----- Planets
    const systemView = new SystemViewScene();

    const rand = new Random();
    const numberOfPlanets = rand.integer(1, 5);

    planetsInfo.text = `This system has ${numberOfPlanets} planets`;

    systemView.add(planetsInfo);

    // Random system =)
    for (let i = 1; i < numberOfPlanets + 1; i++) {
      const radius = rand.integer(10, 100);
      const pArgs: PlanetActorArgs = {
        // FIXME
        planet: new Planet(),
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

      const p = new PlanetActor(pArgs, this);
      systemView.add(p);
    }    

    const orbitView = new OrbitViewScene();

    this.addScene(systemView.key, systemView);
    this.addScene(orbitView.key, orbitView);

    // ----- Subscribing to events
    this.on("toorbitview", (e) => { // this doesn't work
      console.log("orbit view event", e);
      console.log(e.target);
      e.target.goToScene(orbitView.key);
    })

    

    // ----- Starting
    const loader = new Loader([Resources.Sword]);
    this.start(loader).then(() => {
      this.goToScene(systemView.key);
    });
  }
}

export const game = new Game();

game.toggleDebug();

//game.input.pointers.on("down", e => game.goToScene("orbitviewscene")); // this works

game.initialize();
