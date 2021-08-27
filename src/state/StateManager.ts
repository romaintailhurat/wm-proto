import { Planet } from "../models/Planet";
import { Ship } from "../models/Ship";

interface UIState {}

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
    this.state.currentPlanet = planet;
  }

  public setShip(ship: Ship) {
    this.state.ship = ship;
  }
}
