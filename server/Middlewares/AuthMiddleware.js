const User = require("../Models/UserModels");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {


      jwt.verify(
        token,
        "MySceretKey",
        async (err, decodedToken) => {
          if (err) {
            
            res.json({ status: false });
            next();
          } else {
            const user = await User.findById(decodedToken.userId);
            if (user){ 
              
              res.json({ status: true, user: user.email,role: user.role, username:user.username});
            }
            else {
              res.json({ status: false });
          }
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
  };
