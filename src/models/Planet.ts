import {
  randomName,
  randomRadius,
  randomType,
} from "../utils/planetRandomness";

export enum PlanetTypes {
  Big,
  Small,
  Medium,
}

export class Planet {
  public name: string;
  public type: PlanetTypes;
  public radius: number;

  constructor() {
    this.name = randomName();
    this.type = randomType();
    this.radius = randomRadius(this.type);
  }
}
