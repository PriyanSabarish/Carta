const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Apply, getAllApplications } = require("../Controllers/ApplicationController");
const { get } = require("mongoose");
const Application = require('../Models/ApplicationModel'); 
router.use(cors({
    origin : ["http://localhost:3000"],
    credentials: true
}));


router.post("/apply",Apply)

module.exports = router;