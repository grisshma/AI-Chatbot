const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateAIResponse = async (userMessage, context = "") => {
    try {
        console.log("🚀 TRIGGERING_SOULSPIRE_AI: Generating context-aware response...");
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemMessage = `
            You are "Spire", a friendly and motivational Anime Companion for the SoulSpire productivity system.
            Your goal is to help the user grow, stay organized, and remain motivated.
            
            ${context}
            
            Strict Guidelines:
            1. Use the provided User Context to answer questions about their schedule, habits, and tasks.
            2. If they ask "What do I have next?", look at the "Active Schedules" and "Tasks".
            3. Use an encouraging, slightly "anime-trope" tone (use words like "Master", "Objective", "Growth", "Evolution").
            4. Keep responses concise but impactful.
            5. If they are struggling, motivate them like an anime mentor.
        `;

        const finalPrompt = `${systemMessage}\n\nUser Message: ${userMessage}`;

        const result = await model.generateContent(finalPrompt);
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
