import {
  Color,
  DisplayMode,
  Engine,
  GameEvent,
  Label,
  Loader,
  Random,
  vec,
  Vector,
} from "excalibur";
import { Resources } from "./resources";
import { PlanetActor } from "./actors/PlanetActor";
import { SystemViewScene } from "./scenes/SystemViewScene";
import { OrbitViewScene } from "./scenes/OrbitViewScene";
import { PlanetarySystem } from "./models/PlanetarySystem";
import { ShipActor } from "./actors/ShipActor";
import { Ship } from "./models/Ship";
import { ColorPalette } from "./utils/colorPalette";
import { StateManager } from "./state/StateManager";
import { Probe } from "./models/Probe";

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.Fill, backgroundColor: Color.Black });
  }

  initialize() {
    // ----- State
    const stateManager = StateManager.getInstance();

    // ------ UI
    const planetsInfo = new Label({ text: "info", pos: new Vector(100, 10) });
    planetsInfo.color = ColorPalette.TextBlue;
    this.add(planetsInfo);

    // ----- Starting Ship
    const ship = new Ship();
    ship.addProbe(new Probe());
    stateManager.setShip(ship);

    // ----- Starting System
    const startingSystem = new PlanetarySystem();

    // ----- Planets
    const systemView = new SystemViewScene();

    planetsInfo.text =
      `This system has ${startingSystem.getPlanets().length} planets`;

    systemView.add(planetsInfo);

    for (const [index, planet] of startingSystem.getPlanets().entries()) {
      const planetActor = new PlanetActor(
        {
          planet: planet,
          scaleFactor: 1,
          pos: new Vector(this.canvasWidth * 2 / 3, 150 * (index + 1)),
        },
      );

      systemView.add(planetActor);
    }

    // ----- Ship
    const shipActor = new ShipActor({
      pos: vec(this.canvasWidth * 1 / 3, 100),
      ship: ship,
    });
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
      StateManager.getInstance().setCurrentSceneKey(systemView.key);
    });
  }
}

export const game = new Game();

//game.toggleDebug();

game.on("to_scene", (event: GameEvent<PlanetActor>) => {
  console.log("Switching scene", event);
  game.goToScene(OrbitViewScene.getViewKey());
  StateManager.getInstance().setCurrentSceneKey(OrbitViewScene.getViewKey());
});

game.initialize();
