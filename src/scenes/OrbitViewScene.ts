import { Scene } from "excalibur";
import { PlanetActor } from "../actors/PlanetActor";
import { StateManager } from "../state/StateManager";

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
      radius: planet.radius,
    });

    this.add(planetActor);
  }
}
