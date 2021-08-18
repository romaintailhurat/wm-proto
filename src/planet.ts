import { Actor, ActorArgs, Graphics, Logger } from "excalibur";

export interface PlanetArgs extends ActorArgs {
  radius: number;
}

export class Planet extends Actor {
  public radius: number;

  constructor(opts: PlanetArgs) {
    super(opts);
    
  }

  onInitialize() {
    const planetShape = new Graphics.Circle({
      radius: this.radius,
      color: this.color,
    });    

    this.graphics.add(planetShape);
    
    this.enableCapturePointer = true;
    this.on("pointerup", () => {      
      alert("blip");
    });
  }
}
