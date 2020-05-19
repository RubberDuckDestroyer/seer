import Enum from "./Enum";
import ResearchMethodType from "./ResearchMethodType";
import MethodType from "./MethodType";
import MethodologyType from "./MethodologyType";
import IntegrityType from "./IntegrityType";
import FilterValueType, { FilterValueEnum } from "./FilterValueType";

interface ICategoryEnumParam {
    dbField: String,
    valueType: FilterValueEnum,
    domain?: Enum[]
}
class CategoryEnum extends Enum {

    dbField: String;
    valueType: FilterValueEnum;
    domain: Enum[];

    constructor(name: String, param: ICategoryEnumParam) {
        super(name);
        this.dbField = param.dbField;
        this.valueType = param.valueType;
        this.domain = param.domain || null;
    }
}

const FilterCategoryType = {
    // Bibliographic fields
    authors: new CategoryEnum("Authors", {
        dbField: "submission.bibliography.AUTHOR",
        valueType: FilterValueType.stringInput
    }),
    title: new CategoryEnum("Title", {
        dbField: "submission.bibliography.TITLE",
        valueType: FilterValueType.stringInput
    }),
    journal: new CategoryEnum("Journal", {
        dbField: "submission.bibliography.JOURNAL",
        valueType: FilterValueType.stringInput
    }),
    publicationYear: new CategoryEnum("Publication year", {
        dbField: "submission.bibliography.YEAR",
        valueType: FilterValueType.numberInput
    }),
    publicationMonth: new CategoryEnum("Publication month", {
        dbField: "submission.bibliography.MONTH",
        valueType: FilterValueType.stringInput
    }),
    publicationType: new CategoryEnum("Publication type", {
        dbField: "submission.bibliography.type",
        valueType: FilterValueType.stringInput
    }),

    // Article fields
    question: new CategoryEnum("Question", {
        dbField: "question",
        valueType: FilterValueType.stringInput
    }),
    metric: new CategoryEnum("Metric", {
        dbField: "metric",
        valueType: FilterValueType.stringInput
    }),
    researchMethod: new CategoryEnum("Research method", {
        dbField: "researchMethodType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(ResearchMethodType)
    }),
    method: new CategoryEnum("SE Method", {
        dbField: "methodType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(MethodType)
    }),
    methodology: new CategoryEnum("Methodology", {
        dbField: "methodologyType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(MethodologyType)
    }),
    benefit: new CategoryEnum("Benefit", {
        dbField: "benefit",
        valueType: FilterValueType.stringInput
    }),
    participant: new CategoryEnum("Participant", {
        dbField: "participant",
        valueType: FilterValueType.stringInput
    }),
    contextWhere: new CategoryEnum("Where", {
        dbField: "context.where",
        valueType: FilterValueType.stringInput
    }),
    contextWhen: new CategoryEnum("When", {
        dbField: "context.when",
        valueType: FilterValueType.stringInput
    }),
    contextWhat: new CategoryEnum("What", {
        dbField: "context.what",
        valueType: FilterValueType.stringInput
    }),
    contextWhom: new CategoryEnum("Whom", {
        dbField: "context.whom",
        valueType: FilterValueType.stringInput
    }),
    contextHow: new CategoryEnum("How", {
        dbField: "context.how",
        valueType: FilterValueType.stringInput
    }),
    result: new CategoryEnum("Where", {
        dbField: "result",
        valueType: FilterValueType.stringInput
    }),
    integrity: new CategoryEnum("Where", {
        dbField: "integrity",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(IntegrityType)
    }),
};
export default FilterCategoryType;
