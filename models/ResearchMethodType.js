const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const ResearchMethodTypeSchema = new mongoose.Schema(EnumSchemaData);

const ResearchMethodType = mongoose.model("ResearchMethodType", ResearchMethodTypeSchema);
module.exports = ResearchMethodType;
