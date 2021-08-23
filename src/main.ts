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
import {
  PlanetActor,
  PlanetActorArgs,
  ToOrbitViewEvent,
} from "./actors/PlanetActor";
import { SystemViewScene } from "./scenes/SystemViewScene";
import { OrbitViewScene } from "./scenes/OrbitViewScene";
import { Planet } from "./models/Planet";
import { PlanetarySystem } from "./models/PlanetarySystem";
import { ShipActor } from "./actors/ShipActor";
import { Ship } from "./models/Ship";

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.Fill, backgroundColor: Color.Black });
  }

  initialize() {
    // ------ UI
    const planetsInfo = new Label({ text: "info", pos: new Vector(100, 10), });
    planetsInfo.color = Color.Orange;
    this.add(planetsInfo);

    // ----- Starting Ship
    const ship = new Ship();

    // ----- Starting System
    const startingSystem = new PlanetarySystem();

    // ----- Planets
    const systemView = new SystemViewScene();

    planetsInfo.text = `This system has ${
      startingSystem.getPlanets().length
    } planets`;

    systemView.add(planetsInfo);

    const rand = new Random();

    for (const [index, planet] of startingSystem.getPlanets().entries()) {
      const planetActor = new PlanetActor(
        {
          planet: planet,
          radius: rand.integer(10, 100),
          pos: new Vector(this.canvasWidth * 2 / 3, 150 * (index + 1)),
          color: rand.pickOne([
            Color.Orange,
            Color.Gray,
            Color.Red,
            Color.Rose,
            Color.Violet,
            Color.Green,
            Color.DarkGray,
          ]),
        },
        this
      );

      systemView.add(planetActor);
    }

    // ----- Ship
    const shipActor = new ShipActor({ pos: vec(this.canvasWidth * 1 / 3, 100), ship: ship });
    systemView.add(shipActor);

    const orbitView = new OrbitViewScene();

    this.addScene(systemView.key, systemView);
    this.addScene(orbitView.key, orbitView);

    // ----- Subscribing to events
    this.on("toorbitview", (e) => {
      // this doesn't work
      console.log("orbit view event", e);
      console.log(e.target);
      e.target.goToScene(orbitView.key);
    });

    // ----- Starting
    const loader = new Loader([Resources.Sword]);
    this.start(loader).then(() => {
      this.goToScene(systemView.key);
    });
  }
}

export const game = new Game();

// game.toggleDebug();

//game.input.pointers.on("down", e => game.goToScene("orbitviewscene")); // this works

game.initialize();
