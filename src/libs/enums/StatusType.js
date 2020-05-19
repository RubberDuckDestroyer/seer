const Enum = require("./Enum");

const StatusType = {
    submitted: new Enum("Submitted"),
    accepted: new Enum("Accepted"),
    rejected: new Enum("Rejected"),
    complete: new Enum("Completed")
};
module.exports = StatusType;
