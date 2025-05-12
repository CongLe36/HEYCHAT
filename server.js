const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hey_chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// OpenAI Configuration
const openai = new OpenAIApi(new Configuration({ apiKey: 'YOUR_OPENAI_API_KEY' }));

// WebSocket for real-time messaging
io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data); // Broadcast to all users
    const message = new Message(data);
    message.save(); // Save to the database
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// API Endpoints
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).send('Error with AI Chatbot');
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));