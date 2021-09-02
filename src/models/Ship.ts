import { Resource } from "./Resource";
import { Probe } from "./Probe";
import { Planet } from "./Planet";

export class Ship {
  public resources: Resource[];
  public probes: Probe[];
  public orbitingPlanet: Planet;

  constructor() {
    this.resources = [];
    this.probes = [];
    this.orbitingPlanet = null;
  }

  addProbe(probe: Probe) {
    this.probes.push(probe);
  }
}
