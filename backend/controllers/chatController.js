const { generateReply } = require("../utils/aiHelper");

exports.chatWithAI = async (req,res)=>{
    const { message } = req.body;
    const reply = await generateReply(message);
    res.json({ reply });
};