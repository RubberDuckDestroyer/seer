import Enum from "./Enum";

type OperationHandler = (query: any, x: any, y: any) => any;

interface FilterJointParam {
    name: string,
    operation: OperationHandler
}

export class FilterJointEnum extends Enum {

    operation: OperationHandler;


    constructor(param: FilterJointParam) {
        super(param.name);
        this.operation = param.operation;
    }

    /**
     * Creates an operation for mongoDB query which handles joining of two specified filters.
     */
    evaluate(query: any, x: any, y: any) {
        return this.operation(query, x, y);
    }
}

const FilterJointType = {
    and: new FilterJointEnum({
        name: "AND",
        operation: (query: any, x: any, y: any) => {
            query.$and = [x, y];
            return query;
        }
    }),
    or: new FilterJointEnum({
        name: "OR",
        operation: (query: any, x: any, y: any) => {
            query.$or = [x, y];
            return query;
        }
    }),
    notAnd: new FilterJointEnum({
        name: "NOT AND",
        operation: (query: any, x: any, y: any) => {
            query.$or = [
                { $nor: [x] },
                { $nor: [y] }
            ];
            return query;
        }
    }),
    notOr: new FilterJointEnum({
        name: "NOT OR",
        operation: (query: any, x: any, y: any) => {
            query.$nor = [x, y];
            return query;
        }
    }),
};
export default FilterJointType;
