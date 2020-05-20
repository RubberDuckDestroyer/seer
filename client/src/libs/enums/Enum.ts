export default class Enum {

    name: String;

    constructor(name: String) {
        this.name = name;
    }

    static findByName(type: Object, name: String) {
        const values = Object.values(type);
        for (let i = 0; i < values.length; i++) {
            const e = values[i] as Enum;
            if ((e instanceof Enum) && e.name === name) {
                return e;
            }
        }
        return null;
    }
}
