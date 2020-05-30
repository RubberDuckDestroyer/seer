import Enum from "./Enum";

export class ColumnEnum extends Enum {

    dbField: String;


    constructor(name: String, dbField: String) {
        super(name);
        this.dbField = dbField;
    }

}

const ColumnType = {
    // Bibliography data
    title: new ColumnEnum("Title", "submission.bibliography.TITLE"),
    author: new ColumnEnum("Author", "submission.bibliography.AUTHOR"),
    journal: new ColumnEnum("Journal", "submission.bibliography.JOURNAL"),
    publicationDate: new ColumnEnum("Publication date", "submission.bibliography.DATE"),
    publicationType: new ColumnEnum("Publication type", "submission.bibliography.type"),

    // Article data
    question: new ColumnEnum("Question", "question"),
    metric: new ColumnEnum("Metric", "metric"),
    researchMethodType: new ColumnEnum("Research method", "researchMethodTypd"),
    methodType: new ColumnEnum("SE Method", "methodType"),
    methodologyType: new ColumnEnum("Methodology", "methodologyType"),
    integrity: new ColumnEnum("Integrity", "integrity"),
    result: new ColumnEnum("Result", "result"),
};
export default ColumnType;

