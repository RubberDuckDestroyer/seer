const Enum = require("./Enum");

const MethodType = {
    tdd: new Enum("TDD"),
    bdd: new Enum("BDD"),
    pairProgramming: new Enum("Pair programming"),
    planningPoker: new Enum("Planning poker"),
    dailyStandup: new Enum("Daily standup meetings"),
    storyboards: new Enum("Storyboards"),
    userStoryMapping: new Enum("User story mapping"),
    ci: new Enum("Continuous integration"),
    retrospectives: new Enum("Retrospectives"),
    burndownChart: new Enum("Burndown chart"),
    reqPrioritization: new Enum("Requirements prioritization"),
    versionControl: new Enum("Version control"),
    codeSharing: new Enum("Code sharing")
};
module.exports = MethodType;
