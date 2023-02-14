import axios from 'axios';
import { authToken } from './authToken';

const requestAxios = async (options) => {
  axios.defaults.baseURL = 'http://localhost:5000';

  const accessToken = authToken.getToken();
  let res;

  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  if (!options.url) return;

  try {
    res = await axios(options);
    console.log(res);
  } catch (e) {
    res = e.response;
    console.error(e);
  } finally {
    return checkResponse(res);
  }
};

function checkResponse(res) {
  if (res.status == 200) {
    return res.data;
  } else if (res.status == 400) {
    alert(res.data.message);
    return;
  }

  return res.data;
}

export default requestAxios;
