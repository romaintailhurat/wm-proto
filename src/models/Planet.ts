import { randomName, randomType } from "../utils/planetRandomness";

export enum PlanetTypes {
    Big,
    Small,
    Medium
}

export class Planet {
    public name: string;
    public type: PlanetTypes;

    public static typeToColor() {

    }
    
    constructor() {
        this.name = randomName();
        this.type = randomType();
    }
}