const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Apply, getAllApplications } = require("../Controllers/ApplicationController");
const { get } = require("mongoose");

router.use(cors({
    origin : ["http://localhost:3000"],
    credentials: true
}));


router.post("/apply",Apply)
router.get("/applications",getAllApplications);
module.exports = router;