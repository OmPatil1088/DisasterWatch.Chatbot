const router=require("express").Router();

router.post("/",(req,res)=>{

const msg=req.body.message.toLowerCase();
let reply="I am monitoring disasters.";

if(msg.includes("flood"))
reply="Flood warning: Move to higher ground immediately.";

else if(msg.includes("earthquake"))
reply="Drop, Cover, Hold On.";

else if(msg.includes("tsunami"))
reply="Evacuate inland immediately.";

else if(msg.includes("How are You?"))
reply="Hii! I am Nice, And You?.";


else if(msg.includes("who are you"))
reply="I am Ocean Guard, your disaster assistant.";


else if(msg.includes("hii"))
reply="Hii! I am Ocean Guard, your disaster assistant.";

else if(msg.includes("hello"))
reply="Hello! I am Ocean Guard, your disaster assistant.";

res.json({reply});
});

module.exports=router;