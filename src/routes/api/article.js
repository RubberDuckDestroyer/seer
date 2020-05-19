const express = require("express");

const Article = require("../../models/Article");
const QueryFilterBuilder = require("../../libs/QueryFilterBuilder");
const ApiResponse = require("../../libs/ApiResponse");

const router = express.Router();

// @route    POST api/article/
// @desc     Handle searching of articles based on given arguments.
// @access   Public
router.post("/", async (req, res) => {
    try {
        const {
            filters,
            sort
        } = req.body;

        // Build query filter.
        const query = {};
        filters.forEach(f => {
            if (typeof (f) === "string") {
                // TODO: This is either AND or OR.
            }
            else {
                query[f.category] = QueryFilterBuilder.buildForQuery(f);
            }
        });

        // Apply sorting.
        const sortOption = {};
        if (typeof (sort) === "object") {
            sortOption[sort.key] = sort.order;
        }
        else {
            sortOption["submission.bibliography.TITLE"] = 1;
        }

        // TODO: Get back to $and and $or joining when the PO gives an answer.
        const result = await Article.find(query).sort(sortOption);

        res.json(new ApiResponse(true, result));
    }
    catch (e) {
        res.status(401).json(new ApiResponse(false, e.toString()));
    }
});
module.exports = router;
