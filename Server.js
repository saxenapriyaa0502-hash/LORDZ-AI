import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/*
   OpenAI client

   Your API key stays on the server.
   NEVER put this key in index.html.
*/

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/*
   LORDZ AI endpoint
*/

app.post("/api/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage ||
            typeof userMessage !== "string") {

            return res.status(400).json({
                error: "Message is required."
            });
        }


        const response = await client.responses.create({

            /*
               Choose the model available to
               your API account.
            */

            model: "gpt-6-luna",

            instructions: `
You are LORDZ AI.

You were created by Swastik Saxena.

Your personality should be:
- intelligent
- friendly
- helpful
- concise
- professional

Always identify yourself as LORDZ AI when appropriate.

Do not claim to be ChatGPT.
`,

            input: userMessage
        });


        res.json({
            reply: response.output_text
        });

    }

    catch (error) {

        console.error(
            "LORDZ AI ERROR:",
            error
        );

        res.status(500).json({
            error:
                "LORDZ AI could not process your request."
        });
    }

});


/*
   Start server
*/

const PORT =
    process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `LORDZ AI running on port ${PORT}`
    );

});
