import api from './api';

export async function getInstallers(page = 1, per_page = 10) {
  const response = await api.get('/installers/', {
    params: { page, per_page },
  });
  return response.data;
}

export async function getInstaller(id) {
  const response = await api.get(`/installers/${id}`);
  return response.data;
}

export async function createInstaller(installerData) {
  const response = await api.post('/installers/', installerData);
  return response.data;
}

export async function updateInstaller(id, installerData) {
  const response = await api.put(`/installers/${id}`, installerData);
  return response.data;
}

export async function deleteInstaller(id) {
  const response = await api.delete(`/installers/${id}`);
  return response.data;
}

export async function getInstallerOverview(installerId) {
  const response = await api.get(`/installers/${installerId}/overview`);
  return response.data;
}
