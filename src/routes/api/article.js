import express from "express";

import Article from "../../models/Article";
import QueryFilterBuilder from "../../libs/QueryFilterBuilder";
import { ApiResponse } from "../../libs/api/NetworkHelper";

const router = express.Router();

// @route    POST api/article/
// @desc     Handle searching of articles based on given arguments.
router.post("/", async (req, res) => {
  try {
    const {
      filters,
      joints,
      dates,
      sort,
      status
    } = req.body;

    // Build query filter.
    const query = QueryFilterBuilder.build(filters, joints);

    // Apply status filtering.
    QueryFilterBuilder.applyStatusFilter(query, status);

    // Apply date filtering.
    QueryFilterBuilder.applyDateFilter(query, dates);

    // Apply sorting.
    const sortOption = QueryFilterBuilder.createSortOption(sort);

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

// @route    POST api/article/submit
// @desc     Handles submission of a new article.
router.post("/submit", async () => {
  
});

module.exports = router;
