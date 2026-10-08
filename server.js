import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Gemini
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// Function to wait before retrying
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Generate recipe
app.post("/api/generate-recipe", async (req, res) => {

    try {

        const { ingredients } = req.body;

        // Check ingredients
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {

            return res.status(400).json({
                error: "Please provide some ingredients."
            });

        }


        const prompt = `
Here are the ingredients I have:

${ingredients.join(", ")}

Please suggest a recipe I can make using some or all of these ingredients.
        `;


        const systemInstruction = `
You are a helpful recipe assistant.

You receive a list of ingredients that a user has and suggest a recipe they could make with some or all of those ingredients.

You don't need to use every ingredient they mention in your recipe.

The recipe can include additional ingredients that the user didn't mention, but try not to include too many extra ingredients.

Make the recipe practical and easy to follow.

Include:

# Recipe Name

## Ingredients

## Instructions

## Tips

Format your response in Markdown so it can easily be rendered on a web page.
        `;


        // Try the request up to 3 times
        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {

            try {

                console.log(`Gemini request attempt ${attempt}...`);

                response = await ai.models.generateContent({

                    model: "gemini-3.5-flash-lite",

                    contents: prompt,

                    config: {
                        systemInstruction: systemInstruction
                    }

                });

                // If successful, stop retrying
                break;

            } catch (error) {

                console.error(
                    `Gemini attempt ${attempt} failed:`,
                    error.message
                );


                // If it's the last attempt, throw the error
                if (attempt === 3) {
                    throw error;
                }


                // Wait before trying again
                await wait(2000 * attempt);

            }
        }


        // Send recipe back to React
        res.json({
            recipe: response.text
        });


    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({

            error:
                error.message ||
                "Failed to generate recipe."

        });

    }

});


const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});