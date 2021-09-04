import { Planet } from "../models/Planet";
import { Ship } from "../models/Ship";

interface UIState {
  currentSceneKey: string;
}

interface WorldState {
  currentPlanet: Planet;
}

interface ShipState {
  ship: Ship;
}

interface State extends WorldState, ShipState, UIState {}

export class StateManager {
  private static instance: StateManager;

  private state: State = {
    currentPlanet: null,
    ship: null,
    currentSceneKey: null,
  };

  private constructor() {}

  public static getInstance() {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return (StateManager.instance);
  }

  public getState() {
    return (this.state);
  }

  public setState(state: State) {
    this.state = state;
  }

  public setCurrentPlanet(planet: Planet) {
    this.state = {
      ...this.state,
      ...{ currentPlanet: planet },
    };
  }

  public setShip(ship: Ship) {
    //this.state.ship = ship;
    this.state = {
      ...this.state,
      ...{ ship: ship },
    };
  }

  public setCurrentSceneKey(key: string) {
    this.state = {
      ...this.state,
      ...{ currentSceneKey: key },
    };
  }
}
