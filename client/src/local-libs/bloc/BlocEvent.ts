/**
 * Represents an event which a Bloc instance can receive and react upon.
 */
export default class BlocEvent {

    private _name: String;
    private _data: any;


    get name(): String { return this._name; }

    get data(): any { return this._data; }


    constructor(name: String, data: any) {
        this._name = name;
        this._data = data;
    }
}