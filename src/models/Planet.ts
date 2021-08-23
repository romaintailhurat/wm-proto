import { randomName } from "../utils/name";

export class Planet {
    public name: string;
    
    constructor() {
        this.name = randomName();
    }
}