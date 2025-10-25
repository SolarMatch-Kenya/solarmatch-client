import api from './api';

export async function getAnalyses(page = 1, per_page = 10) {
  const response = await api.get('/analysis/', {
    params: { page, per_page },
  });
  return response.data;
}

export async function getAnalysis(id) {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
}

export async function createAnalysis(analysisData) {
  const response = await api.post('/analysis/', analysisData);
  return response.data;
}

export async function updateAnalysis(id, analysisData) {
  const response = await api.put(`/analysis/${id}`, analysisData);
  return response.data;
}

export async function deleteAnalysis(id) {
  const response = await api.delete(`/analysis/${id}`);
  return response.data;
}
