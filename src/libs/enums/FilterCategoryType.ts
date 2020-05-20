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
export class FilterCategoryEnum extends Enum {

    dbField: String;
    valueType: FilterValueEnum;
    domain: Enum[] | null;

    constructor(name: String, param: ICategoryEnumParam) {
        super(name);
        this.dbField = param.dbField;
        this.valueType = param.valueType;
        this.domain = param.domain || null;
    }
}

const FilterCategoryType = {
    // Bibliographic fields
    authors: new FilterCategoryEnum("Authors", {
        dbField: "submission.bibliography.AUTHOR",
        valueType: FilterValueType.stringInput
    }),
    title: new FilterCategoryEnum("Title", {
        dbField: "submission.bibliography.TITLE",
        valueType: FilterValueType.stringInput
    }),
    journal: new FilterCategoryEnum("Journal", {
        dbField: "submission.bibliography.JOURNAL",
        valueType: FilterValueType.stringInput
    }),
    publicationYear: new FilterCategoryEnum("Publication year", {
        dbField: "submission.bibliography.YEAR",
        valueType: FilterValueType.numberInput
    }),
    publicationMonth: new FilterCategoryEnum("Publication month", {
        dbField: "submission.bibliography.MONTH",
        valueType: FilterValueType.stringInput
    }),
    publicationType: new FilterCategoryEnum("Publication type", {
        dbField: "submission.bibliography.type",
        valueType: FilterValueType.stringInput
    }),

    // Article fields
    question: new FilterCategoryEnum("Question", {
        dbField: "question",
        valueType: FilterValueType.stringInput
    }),
    metric: new FilterCategoryEnum("Metric", {
        dbField: "metric",
        valueType: FilterValueType.stringInput
    }),
    researchMethod: new FilterCategoryEnum("Research method", {
        dbField: "researchMethodType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(ResearchMethodType)
    }),
    method: new FilterCategoryEnum("SE Method", {
        dbField: "methodType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(MethodType)
    }),
    methodology: new FilterCategoryEnum("Methodology", {
        dbField: "methodologyType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(MethodologyType)
    }),
    benefit: new FilterCategoryEnum("Benefit", {
        dbField: "benefit",
        valueType: FilterValueType.stringInput
    }),
    participant: new FilterCategoryEnum("Participant", {
        dbField: "participant",
        valueType: FilterValueType.stringInput
    }),
    contextWhere: new FilterCategoryEnum("Where", {
        dbField: "context.where",
        valueType: FilterValueType.stringInput
    }),
    contextWhen: new FilterCategoryEnum("When", {
        dbField: "context.when",
        valueType: FilterValueType.stringInput
    }),
    contextWhat: new FilterCategoryEnum("What", {
        dbField: "context.what",
        valueType: FilterValueType.stringInput
    }),
    contextWhom: new FilterCategoryEnum("Whom", {
        dbField: "context.whom",
        valueType: FilterValueType.stringInput
    }),
    contextHow: new FilterCategoryEnum("How", {
        dbField: "context.how",
        valueType: FilterValueType.stringInput
    }),
    result: new FilterCategoryEnum("Where", {
        dbField: "result",
        valueType: FilterValueType.stringInput
    }),
    integrity: new FilterCategoryEnum("Where", {
        dbField: "integrityType",
        valueType: FilterValueType.fixedSet,
        domain: Object.values(IntegrityType)
    }),
};
export default FilterCategoryType;
