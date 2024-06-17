const {register, login} = require("D:\\fnlyr proj\\patentblockchain\\server\\Controllers\\AuthControllers.js")
const { checkUser } = require("D:\\fnlyr proj\\patentblockchain\\server\\Middlewares\\AuthMiddleware.js");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Apply, getAllApplications, } = require("../Controllers/ApplicationController");
const { ApprovedPatent,getAllPatents ,updateApplicationStatus} = require("../Controllers/PatentController");
const Application = require('../Models/ApplicationModel');

const {PythonConnection }= require('../Controllers/PythonController');
const { getUserDetails } = require("../Controllers/UserController");
const { getAllComments, postParentComent, postChildComent } = require("../Controllers/CommentController");

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

router.put('/applications/:id', async (req, res) => {
    try {
      const { title, description , applicationStatus, userId} = req.body;
      const { id } = req.params;
      const updatedApplication = await Application.findByIdAndUpdate({_id: id},{ applicationStatus: applicationStatus},{ new: true });
      res.json(updatedApplication);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post("/api/run-python-script", PythonConnection);

// user routes
router.get("/userdetails",getUserDetails)

 
//patent routes
router.post("/applyPatent",ApprovedPatent)
router.get("/patents",getAllPatents);


router.get("/getComments",getAllComments)
router.post("/postParentComment",postParentComent)
router.post("/postChildComment",postChildComent)
module.exports = router;