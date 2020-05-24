import BaseBloc from '../local-libs/bloc/BaseBloc';
import Bindable from '../local-libs/data/Bindable';

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
