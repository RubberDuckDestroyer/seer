const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const MethodTypeSchema = new mongoose.Schema(EnumSchemaData);

const MethodType = mongoose.model("MethodType", MethodTypeSchema);
module.exports = MethodType;
