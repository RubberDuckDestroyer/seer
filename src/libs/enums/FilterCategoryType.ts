import Enum from "./Enum";
import ResearchMethodType from "./ResearchMethodType";
import MethodType from "./MethodType";
import MethodologyType from "./MethodologyType";
import IntegrityType from "./IntegrityType";
import FilterValueType, { FilterValueEnum } from "./FilterValueType";

interface ICategoryEnumParam {
    dbField: String,
    dataType: FilterValueEnum,
    domain?: Enum[]
}
class CategoryEnum extends Enum {

    dbField: String;
    dataType: FilterValueEnum;
    domain: Enum[];

    constructor(name: String, param: ICategoryEnumParam) {
        super(name);
        this.dbField = param.dbField;
        this.dataType = param.dataType;
        this.domain = param.domain || null;
    }
}

const FilterCategoryType = {
    // Bibliographic fields
    authors: new CategoryEnum("Authors", {
        dbField: "submission.bibliography.AUTHOR",
        dataType: FilterValueType.stringInput
    }),
    title: new CategoryEnum("Title", {
        dbField: "submission.bibliography.TITLE",
        dataType: FilterValueType.stringInput
    }),
    journal: new CategoryEnum("Journal", {
        dbField: "submission.bibliography.JOURNAL",
        dataType: FilterValueType.stringInput
    }),
    publicationYear: new CategoryEnum("Publication year", {
        dbField: "submission.bibliography.YEAR",
        dataType: FilterValueType.numberInput
    }),
    publicationMonth: new CategoryEnum("Publication month", {
        dbField: "submission.bibliography.MONTH",
        dataType: FilterValueType.stringInput
    }),
    publicationType: new CategoryEnum("Publication type", {
        dbField: "submission.bibliography.type",
        dataType: FilterValueType.stringInput
    }),

    // Article fields
    question: new CategoryEnum("Question", {
        dbField: "question",
        dataType: FilterValueType.stringInput
    }),
    metric: new CategoryEnum("Metric", {
        dbField: "metric",
        dataType: FilterValueType.stringInput
    }),
    researchMethod: new CategoryEnum("Research method", {
        dbField: "researchMethodType",
        dataType: FilterValueType.fixedSet,
        domain: Object.values(ResearchMethodType)
    }),
    method: new CategoryEnum("SE Method", {
        dbField: "methodType",
        dataType: FilterValueType.fixedSet,
        domain: Object.values(MethodType)
    }),
    methodology: new CategoryEnum("Methodology", {
        dbField: "methodologyType",
        dataType: FilterValueType.fixedSet,
        domain: Object.values(MethodologyType)
    }),
    benefit: new CategoryEnum("Benefit", {
        dbField: "benefit",
        dataType: FilterValueType.stringInput
    }),
    participant: new CategoryEnum("Participant", {
        dbField: "participant",
        dataType: FilterValueType.stringInput
    }),
    contextWhere: new CategoryEnum("Where", {
        dbField: "context.where",
        dataType: FilterValueType.stringInput
    }),
    contextWhen: new CategoryEnum("When", {
        dbField: "context.when",
        dataType: FilterValueType.stringInput
    }),
    contextWhat: new CategoryEnum("What", {
        dbField: "context.what",
        dataType: FilterValueType.stringInput
    }),
    contextWhom: new CategoryEnum("Whom", {
        dbField: "context.whom",
        dataType: FilterValueType.stringInput
    }),
    contextHow: new CategoryEnum("How", {
        dbField: "context.how",
        dataType: FilterValueType.stringInput
    }),
    result: new CategoryEnum("Where", {
        dbField: "result",
        dataType: FilterValueType.stringInput
    }),
    integrity: new CategoryEnum("Where", {
        dbField: "integrity",
        dataType: FilterValueType.fixedSet,
        domain: Object.values(IntegrityType)
    }),
};
export default FilterCategoryType;
