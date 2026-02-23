exports.getReports = (req,res)=>{
    res.json([
        {id:1,type:"Flood",status:"critical"},
        {id:2,type:"Fire",status:"medium"}
    ]);
};