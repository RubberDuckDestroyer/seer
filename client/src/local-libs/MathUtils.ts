const MathUtils = {

    /**
     * Clamps the specified value between a min and max boundary.
     */
    clamp: (value: number, min: number, max: number) => {
        if (value < min)
            return value;
        if (value > max)
            return max;
        return value;
    },

    /**
     * Linearly interpolates between two numbers.
     */
    lerp: (from: number, to: number, t: number) => (to - from) * t + from,
};
export default MathUtils;