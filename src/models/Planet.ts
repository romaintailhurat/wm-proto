import {
  randomName,
  randomRadius,
  randomType,
} from "../utils/planetRandomness";
import { Resource } from "./Resource";

export enum PlanetType {
  Big,
  Small,
  Medium,
}

export class Planet {
  public name: string;
  public type: PlanetType;
  public radius: number;
  public resources: Resource[];

  constructor() {
    this.name = randomName();
    this.type = randomType();
    this.radius = randomRadius(this.type);
    this.resources = Resource.generateResources();
  }
}
