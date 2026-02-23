exports.getNews = (req,res)=>{
    res.json([
        {title:"Flood Alert in Mumbai", type:"alert"},
        {title:"Earthquake detected in Japan", type:"breaking"},
        {title:"Wildfire spreads in California", type:"update"}
    ]);
};