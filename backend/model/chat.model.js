const mongoose = require('mongoose');

const Chatbot = new mongoose.Schema({
  message: String,
  reply: String,
});

module.exports = mongoose.model('ChatbotMessage', Chatbot);
