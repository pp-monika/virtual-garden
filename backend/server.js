const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Groq = require("groq-sdk");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/herbs", require("./routes/herbRoutes"));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });


app.post("/api/generate", async (req, res) => {
    try {
        const { herbName } = req.body;

        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: `Give a short and simple description for ${herbName}.` }],
            model: "llama-3.3-70b-versatile",
        });

        res.json({ description: response.choices[0]?.message?.content || "No description available." });
    } catch (error) {
        console.error("Error generating description:", error);
        res.status(500).json({ error: "Failed to generate description" });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
