import express from "express";
import fs from "fs";
import path from "path";

import BibtexParser from "../../libs/BibtexParser";

import Article from "../../models/Article";

const router = express.Router();

// @route    GET api/backend/fill-test-data
// @desc     Automate filling of test data to the database.
// @access   Public
router.get("/fill-test-data", async (req, res) => {
    try {
        const testRawEntries = fs.readFileSync(path.join(__dirname, "TestTddEntries.txt"), "utf8");
        const entries = BibtexParser.parse(testRawEntries);

        const saves = [];
        entries.forEach(async (e) => {
            const article = new Article({
                submission: {
                    bibliography: e
                }
            });
            saves.push(article.save());
        });

        await Promise.all(saves);
        res.send("Inserted test data to database.");
    }
    catch (e) {
        console.log(e);
        res.status(401).send(`Error while filling test data: ${e}`);
    }
});

module.exports = router;
