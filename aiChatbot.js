const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAIApi(configuration);

const getAIResponse = async (userMessage) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }],
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error in AI Chatbot:', error);
        return 'Xin lỗi, tôi không thể trả lời ngay bây giờ.';
    }
};

module.exports = getAIResponse;