const Patent = require('../Models/PatentModel');


exports.ApprovedPatent = async(req,res) =>{
    try {
        console.log(req.body);
        const { applicationID,title, description ,applicationStatus,userId,Cid,transactionHash,abstract,Inventors} = req.body;
        console.log(title, description);
        // Hash password before saving
        const patent = new Patent({
            applicationID,
            title,
            description,
            applicationStatus,
            userId,
            Cid,
            transactionHash,
            abstract,
            Inventors
        });
        await patent.save();
        res.status(201).json({
            message: 'Patent created successfully!',
        });
    } catch (error) {
        console.log(error + " Patent Controller error")
        res.status(500).json({ message: error });
    }
}




exports.getAllPatents = async(req,res) =>{

    try {
        const patents = await Patent.find({ applicationStatus: "approved" });
        res.json(patents);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Patent retrival error' });
    }

};