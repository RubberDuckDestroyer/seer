import MathUtils from "./MathUtils";

export default class Vector3 {

    x = 0;
    y = 0;
    z = 0;

    constructor(...args: number[]) {
        switch (args.length) {
            case 1:
                this.x = this.y = this.z = args[0];
                break;
            case 2:
                this.x = args[0];
                this.y = args[1];
                break;
            case 3:
                this.x = args[0];
                this.y = args[1];
                this.z = args[2];
                break;
            default:
                throw new Error(`Unsupported argument count of ${args.length}`);
        }
    }

    /**
     * Linearly interpolates between two vectors.
     */
    static lerp(from: Vector3, to: Vector3, t: number) {
        return new Vector3(
            MathUtils.lerp(from.x, to.x, t),
            MathUtils.lerp(from.y, to.y, t),
            MathUtils.lerp(from.z, to.z, t)
        );
    }
}