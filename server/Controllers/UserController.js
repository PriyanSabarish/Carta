const User = require('../Models/UserModels');

exports.getUserDetails = async(req,res) =>{

    try {

        const userdetails = await User.find();
        res.json(userdetails);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: ' user details fetch error' });
    }

};