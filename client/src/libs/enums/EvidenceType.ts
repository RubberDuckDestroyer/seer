import Enum from "./Enum";

export class EvidenceTypeEnum extends Enum {

  dbFieldName: string;

  constructor(name: string, dbFieldName: string) {
    super(name);
    this.dbFieldName = dbFieldName;
  }
  
  getFieldName() { return this.dbFieldName; }
}

const EvidenceType = {
  artice: new EvidenceTypeEnum("Article", "JOURNAL"),
  book: new EvidenceTypeEnum("Book", "BOOK"),
  proceeding: new EvidenceTypeEnum("Proceeding", "PROCEEDING"),
  website: new EvidenceTypeEnum("Website", "WEBSITE"),
};
export default EvidenceType;