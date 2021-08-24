import { Planet } from "../models/Planet";

interface UIState {}

interface WorldState {
  currentPlanet: Planet;
}

interface ShipState {}

interface State extends WorldState, ShipState, UIState {}

export class StateManager {
  private static instance: StateManager;

  private state: State = { currentPlanet: null };

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

  public setCurrentPlanet(p: Planet) {
    this.state = { currentPlanet: p };
  }
}
