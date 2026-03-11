const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
AWS.config.update({ region: "ap-south-1" });
const polly = new AWS.Polly();
app.post("/speak", async (req, res) => {
    const { text, voice } = req.body;
    const params = {
        Text: text,
        OutputFormat: "mp3",
        VoiceId: voice
    };
    try {
        const data = await polly.synthesizeSpeech(params).promise();
        res.set({
            "Content-Type": "audio/mpeg"
        });
        res.send(data.AudioStream);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});