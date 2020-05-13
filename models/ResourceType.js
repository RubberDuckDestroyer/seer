const mongoose = require("mongoose");
const EnumSchemaData = require("./BaseEnumType");

const ResourceTypeSchema = new mongoose.Schema(EnumSchemaData);

const ResourceType = mongoose.model("ResourceType", ResourceTypeSchema);
module.exports = ResourceType;
