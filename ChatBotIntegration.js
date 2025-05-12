const askChatbot = async (message) => {
  try {
    const response = await fetch('http://localhost:5000/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Chatbot error:', error);
    return 'AI hiện không khả dụng';
  }
};