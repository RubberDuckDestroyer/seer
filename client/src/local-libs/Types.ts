export type CssUnit = "em" | "ex" | "%" | "px" | "cm" | "mm" | "in" | "pt" | "pc" | "ch" | "rem" | "vh" | "vw" | "vmin" | "vmax";

export type Action = () => void;
export type ActionT<T> = (t: T) => void;
export type ActionTT<T1, T2> = (t1: T1, t2: T2) => void;

export type Constructor<T> = new (...args: any[]) => T;