// Imports
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import * as moment from 'moment';

import config from '../config';

//this.baseUrl = `http://127.0.0.1:8000/${ subdirectory}`;

class ClientController {
    constructor (overrides) {
      this.config = {
        ...this.config,
        ...overrides
      };
      this.authToken = config.authToken;

      this.login = this.login.bind(this)
      this.apiClient = this.getApiClient(this.config)        
    }

    // Authentication Operations

    login (username, password) {
      delete this.apiClient.defaults.headers['Authorization'];

      const form_data = new FormData();
      const grant_type = 'password';
      const item = { grant_type, username, password };
      for (const key in item) { form_data.append(key, item[key]); }

      return this.apiClient
        .post('/auth/jwt/login', form_data)
        .then((response) => { 
          localStorage.setItem('token', JSON.stringify(response.data));
          return this.fetchUser();
      });
    }

    fetchUser() {
      return this.apiClient.get('/users/me')
        .then(({ data }) => {
          localStorage.setItem('user', JSON.stringify(data));
          return data;
        });
    }

    register(email, password, fullName) {
      const registerData = {
        email,
        password,
        full_name: fullName,
        is_active: true
      };

      return this.apiClient.post('/auth/register', registerData).then(
        (response) => { return response.data; });
    }

    logout() {
      this.apiClient.post('/auth/jwt/logout')
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    // task Operations

    getApiClient(config) {
      const initialConfig = { baseURL: `${ config.apiBasePath }/` };
    const client = axios.create(initialConfig);
    client.interceptors.request.use(localStorageTokenInterceptor);
    return client;
  }
}

function localStorageTokenInterceptor(config) {
  const headers = {};
  const tokenString = localStorage.getItem('token');

  if (tokenString) {
    const token = JSON.parse(tokenString);
    const decodedAccessTokrn = jwtDecode(token.access_token);
    const isAccessTokenValid = moment.unix(decodedAccessTokrn.exp).toDate() > new Date()
    if (isAccessTokenValid) { headers['Authorization'] = `Bearer ${ token.access_token }`; }
    else { alert('Sessions have expired. Please login again'); }
  }

  config['headers'] = headers;
  return config;
}

export default ClientController;