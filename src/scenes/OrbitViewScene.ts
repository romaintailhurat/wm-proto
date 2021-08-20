import { Scene } from "excalibur";

export class OrbitViewScene extends Scene {
  // Used when adding the scene to the game
  public key: string;

  constructor() {
    super();
    this.key = "orbitviewscene";
  }
}
