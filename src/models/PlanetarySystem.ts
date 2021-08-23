import { Random } from "excalibur";
import { Planet } from "./Planet";

export class PlanetarySystem {
    public planets: Planet[] = [];

    constructor() {
        const rand = new Random();
        const numberOfPlanets = rand.integer(1, 5);

        for (let i = 1; i < numberOfPlanets + 1; i++) {
            const planet = new Planet();
            this.planets.push(planet);
        }
    }

    getPlanets(): Planet[] {
        return this.planets;
    }
}