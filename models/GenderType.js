const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const GenderTypeSchema = new mongoose.Schema(EnumSchemaData);

const GenderType = mongoose.model("GenderType", GenderTypeSchema);
module.exports = GenderType;
