const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const AffiliationTypeSchema = new mongoose.Schema(EnumSchemaData);

const AffiliationType = mongoose.model("AffiliationType", AffiliationTypeSchema);
module.exports = AffiliationType;
