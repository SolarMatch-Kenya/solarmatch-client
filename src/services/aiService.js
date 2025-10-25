import api from './api';

export async function chatWithSunny(message) {
  const response = await api.post('/chatbot/chat', { message });
  return response.data;
}

export async function getChatHistory(page = 1, per_page = 20) {
  const response = await api.get('/chatbot/history', {
    params: { page, per_page },
  });
  return response.data;
}
