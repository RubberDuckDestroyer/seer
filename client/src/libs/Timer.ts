export default class Timer {

    _duration: number;
    _callbacks: Function[];


    /**
     * Initializes a new timer with specified duration in milliseconds.
     */
    constructor(duration: number) {
        this._duration = duration;
        this._callbacks = new Array<Function>();
    }

    /**
     * Returns the duratino of the timer.
     */
    getDuration() { return this._duration; }

    /**
     * Starts waiting for the timer to finish.
     */
    start(): Promise<Timer> {
        const timer = this;
        const duration = this._duration;
        return new Promise<Timer>((resolve) => {
            setTimeout(() => resolve(timer), duration);
        });
    }
}