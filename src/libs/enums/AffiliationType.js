const Enum = require("./Enum");

const AffiliationType = {
    institution: new Enum("Institution"),
    organization: new Enum("Organization")
};
module.exports = AffiliationType;
