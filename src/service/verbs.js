import axiosClient from './instance';

export async function getRequests(URL, params) {
  const response = axiosClient.get(`${URL}`, {params: params});
  console.log(response);
  return response;
}
