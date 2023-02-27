import axios from 'axios';
import { authToken } from './authToken';

const requestAxios = async (options) => {
  axios.defaults.baseURL = 'http://localhost:5000';

  const accessToken = authToken.getToken();

  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  if (!options.url) return;

  try {
    const res = await axios(options);
    if (res.status !== 200 && res.status !== 201) throw new Error(res);
    return res.data;
  } catch (e) {
    console.error(e);
    return new Error(e);
  }
};

export default requestAxios;
