import BaseBloc from "./BaseBloc";
import BlocEvent from "./BlocEvent";
import { Constructor } from "../Types";

export interface IBlocContextEntry {
    name: String;
    bloc: BaseBloc;
}

export default class BlocContextValue {

    private _entries: IBlocContextEntry[];


    constructor(entries?: Object) {
        this._entries = new Array<IBlocContextEntry>();

        // If default entries are provided, use that.
        if (typeof (entries) === "object") {
            Object.keys(entries)
                .forEach(k => {
                    const bloc = Reflect.get(entries, k) as BaseBloc;
                    if (bloc !== null && bloc !== undefined)
                        this.addEntry({name: k, bloc});
                });
        }
    }

    /**
     * Adds the specified entry under this context's management.
     */
    addEntry(entry: IBlocContextEntry) {
        if (entry === null || entry === undefined)
            return;
        this._entries.push(entry);
    }

    /**
     * Returns the Bloc instance of specified name.
     */
    getBloc<T extends BaseBloc>(constructor: Constructor<T>): T | null {
        for (let i = 0; i < this._entries.length; i++) {
            const entry = this._entries[i];
            if(entry.bloc instanceof constructor)
                return entry.bloc as T;
        }
        console.log("BlocContextValue.getBloc - Could not find bloc of specified constructor.");
        return null;
    }

    /**
     * Returns the Bloc instance of specified name.
     */
    getBlocByKey<T extends BaseBloc>(key: String): T | null {
        for (let i = 0; i < this._entries.length; i++) {
            const entry = this._entries[i];
            if (entry.name === key)
                return entry.bloc as T;
        }
        console.log("BlocContextValue.getBlocByKey - Could not find bloc of specified key: " + key);
        return null;
    }

    /**
     * Dispatches the specified event to all registered entries.
     */
    dispatch(event: BlocEvent) {
        this._entries.forEach(e => e.bloc.processEvent(event));
    }
}