import { Scene, vec } from "excalibur";
import { PlanetActor } from "../actors/PlanetActor";
import { ShipActor } from "../actors/ShipActor";
import { StateManager } from "../state/StateManager";

// TODO put that in a proper file / module
const SCALE_FACTOR = 3;

export class OrbitViewScene extends Scene {
  // Used when adding the scene to the game
  public key: string;

  static getViewKey = () => "orbitviewscene";

  constructor() {
    super();
    this.key = "orbitviewscene";
  }

  onActivate(oldScene: Scene, newScene: Scene) {
    const state = StateManager.getInstance().getState();
    console.log(state);
    const planet = state.currentPlanet;
    console.log(planet);
    const planetActor = new PlanetActor({
      planet: planet,
      scaleFactor: SCALE_FACTOR,
      pos: vec(this.engine.canvasWidth * 2 / 3, this.engine.canvasHeight * 0.5),
    });
    const shipActor = new ShipActor({
      ship: state.ship,
      pos: vec(this.engine.canvasWidth * 1 / 3, this.engine.canvasWidth * 0.5),
    });

    this.add(planetActor);
    this.add(shipActor);
  }
}
