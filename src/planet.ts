import { Actor, ActorArgs, Graphics, Random } from "excalibur";

const randomName = (): string => {
  const rand = new Random();
  const cons = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z"];
  const vows = ["a","e","i","o","u","y"];
  const len = rand.integer(4,10);
  let name = "";
  for (let i = 0; i < len; i++) {
    const isVowel = rand.bool(0.4);
    if(isVowel) {
      name = name + rand.pickOne(vows);
    } else {
      name = name + rand.pickOne(cons);
    }
  }
  return(name);
}

export interface PlanetArgs extends ActorArgs {
  radius: number;
}

export class Planet extends Actor {
  public radius: number;
  public name: string;

  constructor(opts: PlanetArgs) {
    super(opts);
    this.name = randomName();
  }

  toString() {
    return(`Planet ${this.name}`);
  }

  onInitialize() {
    this.width = this.radius * 2;
    this.height = this.radius * 2;

    const planetShape = new Graphics.Circle({
      radius: this.radius,
      color: this.color,
    });    

    this.graphics.add(planetShape);
    
    this.enableCapturePointer = true;
    this.on("pointerup", () => {      
      console.log(this.toString());
    });
  }
}
