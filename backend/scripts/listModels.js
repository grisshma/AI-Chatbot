const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // SDK doesn't have a direct listModels, so we use axios to hit the endpoint
        const axios = require('axios');
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        
        console.log("--- Available Models for your Key ---");
        response.data.models.forEach(m => {
            console.log(`- ${m.name.split('/').pop()} (Supports: ${m.supportedGenerationMethods.join(', ')})`);
        });
        console.log("---------------------------------------");
    } catch (error) {
        console.error("Error listing models:", error.response?.data || error.message);
    }
}

listModels();
