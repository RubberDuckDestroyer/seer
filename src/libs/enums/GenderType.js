const Enum = require("./Enum");

const GenderType = {
    male: new Enum("Male"),
    female: new Enum("Female"),
    other: new Enum("Other")
};
module.exports = GenderType;
