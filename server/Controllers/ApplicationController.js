const Application = require('../Models/ApplicationModel');


exports.Apply = async(req,res) =>{
    try {
        const { title, description , applicationStatus} = req.body;
        console.log(title, description, applicationStatus);
        // Hash password before saving
        const appli = new Application({
            title,
            description,
            applicationStatus
        });
        await appli.save();
        res.status(201).json({
            message: 'Application created successfully!',
        });
    } catch (error) {
        console.log(error + " Application Controller error")
        res.status(500).json({ message: error });
    }
}




exports.getAllApplications = async(req,res) =>{

    try {
        const applications = await Application.find({ applicationStatus: "review" });
        res.json(applications);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Application retrival error' });
    }

};