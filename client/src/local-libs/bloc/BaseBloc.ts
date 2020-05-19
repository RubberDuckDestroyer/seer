import BlocEvent from "./BlocEvent";

type EventHandler = (e: BlocEvent) => void;

class BlocEventHook {

    private _name: String;
    private _handler: EventHandler;


    get name(): String { return this._name; }
    get handler(): EventHandler { return this._handler; }


    constructor(name: String, handler: EventHandler) {
        this._name = name;
        this._handler = handler;
    }

    invoke(e: BlocEvent) {
        this._handler(e);
    }
}

export default class BaseBloc {

    private _eventHooks: BlocEventHook[];


    constructor() {
        this._eventHooks = new Array<BlocEventHook>();
    }

    /**
     * Handles the specified event using handlers registered via hookEvent.
     */
    processEvent(event: BlocEvent) {
        for (let i = 0; i < this._eventHooks.length; i++) {
            let hook = this._eventHooks[i];
            if (hook.name === event.name) {
                hook.invoke(event);
            }
        }
    }

    protected hookEvent(name: String, handler: EventHandler) {
        this._eventHooks.push(new BlocEventHook(name, handler));
    }
}