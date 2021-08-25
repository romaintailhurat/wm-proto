import { Scene, vec } from "excalibur";
import { PlanetActor } from "../actors/PlanetActor";
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
    const planet = state.currentPlanet;
    console.log(`→ ${this.key} - Planet is : ${planet.name}`);
    const planetActor = new PlanetActor({
      planet: planet,
      scaleFactor: SCALE_FACTOR,
      pos: vec(this.engine.canvasWidth * 2 / 3, this.engine.canvasHeight * 0.5),
    });

    this.add(planetActor);
  }
}
