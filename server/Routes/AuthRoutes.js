const {register, login} = require("D:\\fnlyr proj\\patentblockchain\\server\\Controllers\\AuthControllers.js")
const { checkUser } = require("D:\\fnlyr proj\\patentblockchain\\server\\Middlewares\\AuthMiddleware.js");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Apply, getAllApplications, } = require("../Controllers/ApplicationController");
const { ApprovedPatent,getAllPatents  } = require("../Controllers/PatentController");

router.use(cors({
    origin : ["http://localhost:3000"],
    credentials: true
}));

//Sign up authentication
router.post("/", checkUser); 
router.post("/register",register);
router.post("/login",login);

//application routes
router.post("/apply",Apply)
router.get("/applications",getAllApplications);

//patent routes
router.post("/applyPatent",ApprovedPatent)
router.get("/patents",getAllPatents);

module.exports = router;