import { Scene } from "excalibur";
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
    console.log(`→ ${this.key} - state : ${state}`);
  }
}
