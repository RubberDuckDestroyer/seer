const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const RoleTypeSchema = new mongoose.Schema(EnumSchemaData);

const RoleType = mongoose.model("RoleType", RoleTypeSchema);
module.exports = RoleType;
