const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateAIResponse = async (userMessage) => {
    try {
        console.log("🚀 TRIGGERING_GEMINI_SDK_CALL: Initializing...");
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        if (text) {
            return text;
        } else {
            throw new Error('Empty response from Gemini SDK');
        }

    } catch (error) {
        console.error("GEMINI_SDK_ERROR_TRACE:", error.message);
        if (error.message.includes('429') || error.message.includes('quota')) {
            throw new Error('AI is warming up! ☕ Google is still activating your free key. Please wait 5-10 minutes and try again.');
        }
        throw new Error('GEMINI_FINAL_SDK_ERROR: ' + error.message);
    }
};
