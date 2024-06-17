const Comments = require("../Models/CommentModel");

exports.getAllComments = async (req, res) => {
  try {
    const patentId = req.query.patentId;
    console.log(patentId)
    const comments = await Comments.find({ patentId: patentId });
    console.log("The comments: ",comments)
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Patent retrival error" });
  }
};

exports.postParentComent = async (req, res) => {
  try {
   
    const { patentId, commentBy, commentText,userName} = req.body;
    console.log("postParentComent :" ,patentId);
    const comment = new Comments({
      patentId,
      commentBy,
      userName,
      commentText,
      replies: [],
    });
    await comment.save();
    res.status(201).json({
      message: "Parent Comment created successfully!",
    });
  } catch (error) {
    console.log(error + " Parent Comment Controller error");
    res.status(500).json({ message: error });
  }
};

exports.postChildComent = async (req, res) => {
  try {
    console.log(req.body);
    const { patentId, commentBy, commentText, commentId } = req.body;
    if (commentId) {
      const parentComment = await Comments.findById(commentId);

      if (!parentComment) {
        return res.status(400).json({ message: "Parent comment not found." });
      }

      const newComment = new Comments({
        patentId,
        commentBy,
        commentText,
        replies: [],
      });
      await newComment.save();
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    }
    res.status(201).json({
      message: "Child Comment created successfully!",
    });
  } catch (error) {
    console.log(error + " Parent Comment Controller error");
    res.status(500).json({ message: error });
  }
};
