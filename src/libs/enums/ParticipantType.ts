import Enum from "./Enum";

const ParticipantType = {
    undergraduate: new Enum("Undergraduate students"),
    postgraduate: new Enum("Postgraduate students"),
    practitioners: new Enum("Practitioners")
};
export default ParticipantType;
