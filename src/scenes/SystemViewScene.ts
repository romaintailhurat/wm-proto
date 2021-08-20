import { Scene } from "excalibur";

export class SystemViewScene extends Scene {
    // Used when adding the scene to the game
    public key: string;

    constructor() {
        super();
        this.key = "systemviewscene";
    }
}