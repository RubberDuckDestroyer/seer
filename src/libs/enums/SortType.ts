import Enum from "./Enum";

class SortEnum extends Enum {

    dbField: String;


    constructor(name: String, dbField: String) {
        super(name);
        this.dbField = dbField;
    }

}

const SortType = {
    // Bibliography data
    title: new SortEnum("Title", "submission.bibliography.TITLE"),
    author: new SortEnum("Author", "submission.bibliography.AUTHOR"),
    journal: new SortEnum("Journal", "submission.bibliography.JOURNAL"),
    publicationDate: new SortEnum("Publication date", "submission.bibliography.DATE"),
    publicationType: new SortEnum("Publication type", "submission.bibliography.type"),

    // Article data
    question: new SortEnum("Question", "question"),
    metric: new SortEnum("Metric", "metric"),
    researchMethodTypd: new SortEnum("Research method", "researchMethodTypd"),
    methodType: new SortEnum("SE Method", "methodType"),
    methodologyType: new SortEnum("Methodology", "methodologyType"),
    integrity: new SortEnum("Integrity", "integrity"),
};
export default SortType;

