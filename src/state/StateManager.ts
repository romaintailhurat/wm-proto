export class StateManager {
    private static instance: StateManager;

    private state: number = 0;

    private constructor() {}

    public static getInstance() {
        if(!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return(StateManager.instance);
    }

    public inc() {
        this.state = this.state + 1;
    }
    
    public getState() {
        return(this.state);
    }


}