import express from "express";

import Article from "../../models/Article";
import QueryFilterBuilder from "../../libs/QueryFilterBuilder";
import { ApiResponse } from "../../libs/api/NetworkHelper";
import Utils from "../../libs/Utils";
import Enum from "../../libs/enums/Enum";
import EvidenceType, { EvidenceTypeEnum } from "../../libs/enums/EvidenceType";
import StatusType from "../../libs/enums/StatusType";

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
router.post("/submit", async (req, res) => {
  const {
    info
  } = req.body;

  try {
    // Validate mandatory fields
    if (!Utils.isValidString(info.TITLE)) {
      throw new Error("Missing mandatory field - TITLE!");
    }
    if (!Utils.isValidString(info.AUTHOR)) {
      throw new Error("Missing mandatory field - AUTHOR!");
    }
    if (!Utils.isValidString(info.SOURCE)) {
      throw new Error("Missing mandatory field - SOURCE!");
    }
    if (!Utils.isValidString(info.type)) {
      throw new Error("Missing mandatory field - type!");
    }
    if (!Utils.isValidNumber(info.YEAR)) {
      throw new Error("Missing mandatory field - YEAR!");
    }

    // Make sure type is one of supported values.
    const evidenceType = Enum.findByName(EvidenceType, info.type);
    if (!(evidenceType instanceof EvidenceTypeEnum)) {
      throw new Error(`Unsupported evidence type: ${info.type}`);
    }

    // Convert SOURCE appropriately based on type.
    info[evidenceType.getFieldName()] = info.SOURCE;
    delete info.SOURCE;

    // Create article and insert to DB.
    const newArticle = new Article({
      submission: {
        statusType: StatusType.submitted.name,
        bibliography: info
      }
    });
    await newArticle.save();

    res.json(new ApiResponse({
      isSuccess: true,
      data: newArticle
    }));
  }
  catch (e) {
    res.status(401).json(new ApiResponse(e));
  }
});

module.exports = router;
