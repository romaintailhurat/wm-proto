import { Actor, Color, DisplayMode, Engine, Loader, vec, Graphics, ActorArgs, Vector } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";

const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

interface PlanetArgs extends ActorArgs {
  radius: number;
}

class Planet extends Actor {
  public radius:number;

  constructor(opts: PlanetArgs) {
    super(opts)
  }

  onInitialize() {
    const planetShape = new Graphics.Circle({
      radius: this.radius,
      color: this.color,
    })

    this.graphics.add(planetShape);
  }
}

class Game extends Engine {
    constructor() {
      super({width: 800, height: 600});
    }
    initialize() {
      
      //const player = new Player();
      //this.add(player);      

      const numberOfPlanets = Math.floor((Math.random() * 5) + 1);

      for (let i = 1 ; i < numberOfPlanets; i++) {
        const radius = Math.floor((Math.random() * 5) + 1) * 10;
        const pArgs: PlanetArgs = {
          pos: new Vector(500, 100*i),
          radius: radius, 
          color: Color.fromHex(`#${genRanHex(6)})`)
        };
  
        const p = new Planet(pArgs);
        this.add(p);
      }
      

      const loader = new Loader([Resources.Sword]);
      this.start(loader);
    }
  }
  
  export const game = new Game();
  
  game.initialize();