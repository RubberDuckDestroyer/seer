import { BaseBloc, Bindable } from "bindable-bloc";

export default class LoaderBloc extends BaseBloc {

    isShowing: Bindable<boolean>;

    constructor() {
        super();
        this.isShowing = new Bindable<boolean>(false);
    }

    show() {
        this.isShowing.setValue(true);
    }

    hide() {
        this.isShowing.setValue(false);
    }
}
