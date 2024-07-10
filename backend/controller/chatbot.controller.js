// controllers/chatbotController.js
const ChatbotMessage = require('../model/chat.model');

async function getReply(message) {
  // Placeholder for chatbot logic
  const responses = {
    'hello': 'Hi there! How can I help you with your fashion needs today?',
    'style advice': 'Sure! What occasion are you dressing for?',
    'casual outfit': 'How about pairing jeans with a trendy t-shirt and sneakers?',
    'formal outfit': 'A classic suit with a tie or a sleek dress would be perfect for a formal occasion.',
    'latest trends': 'This season, bold colors and oversized jackets are in trend.',
    'fashion tips': 'Always dress according to your body type and choose colors that complement your skin tone.',
    'best sellers': 'Our best sellers include the classic leather jacket, skinny jeans, and white sneakers.',
    'return policy': 'You can return any item within 30 days of purchase. Make sure it is in its original condition.',
    'shipping details': 'We offer free shipping on orders over $50. Delivery usually takes 3-5 business days.',
    'payment methods': 'We accept credit cards, debit cards, PayPal, and Apple Pay.',
  };

  return responses[message.toLowerCase()] || "Sorry, I didn't understand that. Could you please rephrase?";
}

async function postMessage(req, res) {
  const { message } = req.body;
  const reply = await getReply(message);
  res.json({ reply });
}

module.exports = {
  postMessage,getReply
};
