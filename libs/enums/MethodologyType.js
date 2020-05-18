const Enum = require("./Enum");

const MethodologyType = {
    scrum: new Enum("Scrum"),
    waterfall: new Enum("Waterfall"),
    spiral: new Enum("Spiral"),
    xp: new Enum("XP"),
    rationalUnifiedProcess: new Enum("Rational unified process"),
    crystal: new Enum("Crystal"),
    cleanRoom: new Enum("Clean room"),
    featureDrivenDev: new Enum("Feature driven development"),
    modelDrivenDev: new Enum("Model driven development"),
    domainDrivenDev: new Enum("Domain driven development"),
    formalMethods: new Enum("Formal methods"),
    problemDrivenDev: new Enum("Problem driven development"),
    cloudComputing: new Enum("Cloud computing"),
    serviceOrientedDev: new Enum("Service oriented development"),
    aspectOrientedDev: new Enum("Aspect oriented development"),
    valuesDrivenDev: new Enum("Values driven development"),
    productDrivenDev: new Enum("Product driven development"),
    agile: new Enum("Agile")
};
module.exports = MethodologyType;
