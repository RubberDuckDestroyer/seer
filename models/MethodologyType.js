const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const MethodologyTypeSchema = new mongoose.Schema(EnumSchemaData);

const MethodologyType = mongoose.model("MethodologyType", MethodologyTypeSchema);
module.exports = MethodologyType;
