export default class Enum {

    constructor(name) {
        this.name = name;
    }

    static findByName(type, name) {
        const values = Object.values(type);
        for (let i = 0; i < values.length; i++) {
            if ((values[i] instanceof Enum) && values[i].name === name) {
                return values[i];
            }
        }
        return null;
    }
}
