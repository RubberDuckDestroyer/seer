import BaseBloc from "../libs/bloc/BaseBloc";
import Bindable from "../libs/data/Bindable";

export default class CounterBloc extends BaseBloc {

    count = new Bindable(0);


    increment() {
        this.count.setValue(this.count.getValue() + 1);
    }

    decrement() {
        this.count.setValue(this.count.getValue() - 1);
    }
}
