const express = require("express");

const AffiliationType = require("../../models/AffiliationType");
const GenderType = require("../../models/GenderType");
const MethodologyType = require("../../models/MethodologyType");
const MethodType = require("../../models/MethodType");
const ResearchMethodType = require("../../models/ResearchMethodType");
const ResourceType = require("../../models/ResourceType");
const RoleType = require("../../models/RoleType");
const StatusType = require("../../models/StatusType");

// The actual data to be inserted to the database.
const allEnums = [
    [AffiliationType, {
        INSTITUTION: "Institution",
        ORGANIZATION: "Organization"
    }],
    [GenderType, {
        MALE: "Male",
        FEMALE: "Female",
        OTHER: "Other"
    }],
    [MethodologyType, {
        SCRUM: "Scrum",
        WATERFALL: "Waterfall",
        SPIRAL: "Spiral",
        XP: "XP",
        RATIONAL_UNIFIED_PROCESS: "Rational unified process",
        CRYSTAL: "Crystal",
        CLEAN_ROOM: "Clean room",
        FEATURE_DRIVEN_DEVELOPMENT: "Feature driven development",
        MODEL_DRIVEN_DEVELOPMENT: "Model driven development",
        DOMAIN_DRIVEN_DEVELOPMENT: "Domain driven development",
        FORMAL_METHODS: "Formal methods",
        PROBLEM_DRIVEN_DEVELOPMENT: "Problem driven development",
        CLOUD_COMPUTING: "Cloud computing",
        SERVICE_ORIENTED_DEVELOPMENT: "Service oriented development",
        ASPECT_ORIENTED_DEVELOPMENT: "Aspect oriented development",
        VALUES_DRIVEN_DEVELOPMENT: "Values driven development",
        PRODUCT_DRIVEN_DEVELOPMENT: "Product driven development",
        AGILE: "Agile"
    }],
    [MethodType, {
        TDD: "TDD",
        BDD: "BDD",
        PAIR_PROGRAMMING: "Pair programming",
        PLANNING_POKER: "Planning poker",
        DAILY_STANDUP_MEETINGS: "Daily standup meetings",
        STORYBOARDS: "Storyboards",
        USER_STORY_MAPPING: "User story mapping",
        CONTINUOUS_INTEGRATION: "Continuous integration",
        RETROSPECTIVES: "Retrospectives",
        BURNDOWN_CHART: "Burndown chart",
        REQUIREMENTS_PRIORITIZATION: "Requirements prioritization",
        VERSION_CONTROL: "Version control",
        CODE_SHARING: "Code sharing"
    }],
    [ResearchMethodType, {
        CASE_STUDY: "Case study",
        FIELD_OBSERVATION: "Field observation",
        EXPERIMENT: "Experiment",
        INTERVIEW: "Interview",
        SURVEY: "Survey"
    }],
    [ResourceType, {
        JOURNAL: "Journal",
        WEB_ARTICLE: "Web article"
    }],
    [RoleType, {
        ADMIN: "Administrator",
        MODERATOR: "Moderator",
        ANALYST: "Analyst",
        USER: "User",
        SDM_MEMBER: "SDM member"
    }],
    [StatusType, {
        SUBMITTED: "Submitted",
        ACCEPTED: "Accepted",
        REJECTED: "Rejected",
        COMPLETE: "Completed"
    }]
];


const router = express.Router();

// @route    GET api/backend
// @desc     Automate enum value input
// @access   Public
router.get("/", async (req, res) => {
    const requests = [];
    allEnums.forEach(([schema, values]) => {
        const request = schema.find({}, async (findError, enums) => {
            if (findError) {
                console.log(`Failed to insert enum value for ${schema.name}. Error: ${findError}`);
                return;
            }

            const containsKey = (key) => {
                for (let i = 0; i < enums.length; i++) {
                    if (enums[i].type === key) {
                        return true;
                    }
                }
                return false;
            };
            const toInsert = [];
            Object.keys(values).forEach(k => {
                if (!containsKey(k)) {
                    toInsert.push({
                        type: k,
                        name: values[k]
                    });
                }
            });
            if (toInsert.length > 0) {
                try {
                    await schema.create(toInsert);
                }
                catch (creationError) {
                    console.log(`Failed to create entries for schema ${schema.name}. Error: ${creationError}`);
                }
            }
        });
        requests.push(request);
    });

    try {
        await Promise.all(requests);
        res.send("Enums inserted. Check server logs for any information.");
    }
    catch (yieldError) {
        res.status(401).send(`Failed while waiting for insertion: ${yieldError}`);
    }
});

module.exports = router;
