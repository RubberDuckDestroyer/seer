export default class Enum {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    static findByName(type: Object, name: string) {
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
