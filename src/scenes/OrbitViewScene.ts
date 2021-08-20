import { Scene } from "excalibur";

export class OrbitViewScene extends Scene {
  // Used when adding the scene to the game
  public key: string;

  static getViewKey = () => "orbitviewscene";

  constructor() {
    super();
    this.key = "orbitviewscene";    
  }

  onActivate(oldScene: Scene, newScene: Scene) {
    console.log(`→ ${this.key}`);
  }
}
