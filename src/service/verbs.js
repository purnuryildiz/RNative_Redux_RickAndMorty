import axiosClient from './instance';

export async function getRequests(URL, params) {
  const response = axiosClient.get(`${URL}`, params);
}
