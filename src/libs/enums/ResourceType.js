const Enum = require("./Enum");

const ResourceType = {
    journal: new Enum("Journal"),
    webArticle: new Enum("Web article")
};
module.exports = ResourceType;
