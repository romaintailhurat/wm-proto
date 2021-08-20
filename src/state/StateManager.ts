interface State {
    currentPlanet: string;
}

export class StateManager {
    private static instance: StateManager;

    private state: State = {currentPlanet: null};

    private constructor() {}

    public static getInstance() {
        if(!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return(StateManager.instance);
    }    
    
    public getState() {
        return(this.state);
    }

    public setCurrentPlanet(p: string) {
        this.state = {currentPlanet: p};
    }


}