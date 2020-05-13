const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const StatusTypeSchema = new mongoose.Schema(EnumSchemaData);

const StatusType = mongoose.model("StatusType", StatusTypeSchema);
module.exports = StatusType;
