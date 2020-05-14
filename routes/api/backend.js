const express = require("express");


const router = express.Router();

// @access   Public
    try {
        await Promise.all(requests);
        res.send("Enums inserted. Check server logs for any information.");
    }
    catch (yieldError) {
        res.status(401).send(`Failed while waiting for insertion: ${yieldError}`);
    }
});

module.exports = router;
