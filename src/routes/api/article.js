import express from "express";

import Article from "../../models/Article";
import QueryFilterBuilder from "../../libs/QueryFilterBuilder";
import DateUtils from "../../libs/DateUtils";
import { ApiResponse } from "../../libs/api/NetworkHelper";

const router = express.Router();

// @route    POST api/article/
// @desc     Handle searching of articles based on given arguments.
// @access   Public
router.post("/", async (req, res) => {
    try {
        const {
            filters,
            dates,
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

        // Apply date filtering.
        if (Array.isArray(dates) && dates.length === 2) {
            query["submission.bibliography.DATE"] = {
                $gte: DateUtils.toUTC(dates[0]),
                $lte: DateUtils.toUTC(dates[1])
            };
        }

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

        res.json(new ApiResponse({
            isSuccess: true,
            data: result
        }));
    }
    catch (e) {
        res.status(401).json(new ApiResponse(e));
    }
});
module.exports = router;
