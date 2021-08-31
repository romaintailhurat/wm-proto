import { Random } from "excalibur";

enum ResourceType {
  IRON,
  GOLD,
}

export class Resource {
  public type: ResourceType;

  public static generateResources(n = 2) {
    const rand = new Random();
    const resources: Resource[] = [];
    for (let i = 0; i < n; i++) {
      resources.push(new Resource(ResourceType[rand.integer(0, n - 1)]));
    }
    return (resources);
  }

  constructor(type) {
    this.type = type;
  }
}
