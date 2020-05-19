import MathUtils from "./MathUtils";

const HexColor = {

    byteReciprocal: 1.0 / 255.0,

    create: (str: String) => {
        let r = 255;
        let g = 255;
        let b = 255;
        let a = 255;

        if (str.charAt(0) === '#')
            str = str.substr(1);

        switch (str.length) {
            case 3:
                r = HexColor.parseHex(str.charAt(0)) * 16 + HexColor.parseHex(str.charAt(0));
                g = HexColor.parseHex(str.charAt(1)) * 16 + HexColor.parseHex(str.charAt(1));
                b = HexColor.parseHex(str.charAt(2)) * 16 + HexColor.parseHex(str.charAt(2));
                break;
            case 4:
                r = HexColor.parseHex(str.charAt(0)) * 16 + HexColor.parseHex(str.charAt(0));
                g = HexColor.parseHex(str.charAt(1)) * 16 + HexColor.parseHex(str.charAt(1));
                b = HexColor.parseHex(str.charAt(2)) * 16 + HexColor.parseHex(str.charAt(2));
                a = HexColor.parseHex(str.charAt(3)) * 16 + HexColor.parseHex(str.charAt(3));
                break;
            case 6:
                r = HexColor.parseHex(str.charAt(0)) * 16 + HexColor.parseHex(str.charAt(1));
                g = HexColor.parseHex(str.charAt(2)) * 16 + HexColor.parseHex(str.charAt(3));
                b = HexColor.parseHex(str.charAt(4)) * 16 + HexColor.parseHex(str.charAt(5));
                break;
            case 8:
                r = HexColor.parseHex(str.charAt(0)) * 16 + HexColor.parseHex(str.charAt(1));
                g = HexColor.parseHex(str.charAt(2)) * 16 + HexColor.parseHex(str.charAt(3));
                b = HexColor.parseHex(str.charAt(4)) * 16 + HexColor.parseHex(str.charAt(5));
                a = HexColor.parseHex(str.charAt(6)) * 16 + HexColor.parseHex(str.charAt(7));
                break;
            default:
                throw new Error("Invalid hex color string: {str}");
        }

        return new Color(
            r * HexColor.byteReciprocal,
            g * HexColor.byteReciprocal,
            b * HexColor.byteReciprocal,
            a * HexColor.byteReciprocal
        );
    },

    parseHex: (char: String) => {
        let ch = char.charCodeAt(0);
        if (ch < 58)
            return ch - 48;
        else if (ch < 71)
            return ch - 55; //+10'd
        else if (ch < 103)
            return ch - 87; //+10'd
        return 0;
    }
}

export default class Color {

    r: number;
    g: number;
    b: number;
    a: number;


    constructor(...args: any[]) {
        this.r = this.g = this.b = this.a = 0;

        if (args.length === 0) {
            // Nothing!
        }
        else if (args.length === 1) {
            if (typeof (args[0]) === "string") {
                let parsed = HexColor.create(args[0]);
                this.r = parsed.r;
                this.g = parsed.g;
                this.b = parsed.b;
                this.a = parsed.a;
            }
        }
        else if (args.length === 3) {
            if (typeof (args[0]) === "number" &&
                typeof (args[1]) === "number" &&
                typeof (args[2]) === "number") {
                this.r = args[0];
                this.g = args[1];
                this.b = args[2];
                this.a = 1.0;
            }
        }
        else if (args.length === 4) {
            if (typeof (args[0]) === "number" &&
                typeof (args[1]) === "number" &&
                typeof (args[2]) === "number" &&
                typeof (args[3]) === "number") {
                this.r = args[0];
                this.g = args[1];
                this.b = args[2];
                this.a = args[3];
            }
        }
        else {
            throw new Error(`Unsupported construction argument: ${JSON.stringify(args)}`);
        }
    }

    /**
     * Linearly interpolates between two colors.
     */
    static lerp = (from: Color, to: Color, t: number) => {
        return new Color(
            MathUtils.lerp(from.r, to.r, t),
            MathUtils.lerp(from.g, to.g, t),
            MathUtils.lerp(from.b, to.b, t),
            MathUtils.lerp(from.a, to.a, t),
        );
    };

    /**
     * Returns the string value of the color in hex.
     */
    toHexString(includeAlpha?: boolean) {
        const convertToByte = (element: number) => {
            let byteString = Math.floor(MathUtils.clamp(element * 255, 0, 255)).toString(16);
            if (byteString.length === 1)
                return `0${byteString}`;
            return byteString;
        };
        let str = `#${convertToByte(this.r)}${convertToByte(this.g)}${convertToByte(this.b)}`;
        if (includeAlpha === true) {
            str = `${str}${convertToByte(this.a)}`;
        }
        return str;
    }
}