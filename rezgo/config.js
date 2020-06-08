import axios from 'axios';
import { Auth } from 'aws-amplify';

import { API_URL } from 'react-native-dotenv';

const shackle_api = axios.create({
  baseURL: API_URL
});

shackle_api.interceptors.request.use(async (config) => {
  const token = await Auth.currentSession();

  config.headers.common['access-token'] = token.getIdToken().getJwtToken();

  return config;
});

export default shackle_api;