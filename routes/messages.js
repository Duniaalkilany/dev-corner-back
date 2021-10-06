const router = require("express").Router();
const Message = require("../models/Message");
//add//post message in conv 
router.post("/", async (req, res) => {
  await Message.sync()
  const newMessage = Message.build(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get
router.get("/:conversationId", async (req, res) => {
  try {
    let conversationId =(req.params.conversationId).toString()
    const messages = await Message.findAll({
      where: {
        conversationId: conversationId,
      }
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;