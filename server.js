const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FRONTEND FILES
========================= */
app.use(express.static(path.join(__dirname)));


/* =========================
   ROUTES
========================= */

// Chat Route
const chatRoute = require("./backend/routes/chat");
app.use("/chat", chatRoute);


// Homepage route FIX
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","index.html"));
});


// Example API route
app.get("/api/news", (req, res) => {
    res.json({
        status: "ok",
        articles: [
            { title: "Flood Alert", description: "Heavy rains expected." },
            { title: "Earthquake Warning", description: "Minor tremors detected." }
        ]
    });
});


/* =========================
   START SERVER
========================= */
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});