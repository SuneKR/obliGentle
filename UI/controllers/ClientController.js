// Imports
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import * as moment from 'moment';

import config from 'config';

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

  register(email, password) {
    
    const registerData = {
      email,
      password,
      is_active: true
    };

    return this.apiClient.post('/auth/register', registerData).then(
      (response) => { return response.data; });
  }

  forgottenPassword(email) {
    const forgottenData = {
      email
    };

    return this.apiClient.post('/auth/forgot-password', forgottenData)
      .then((response) => { return response.data; })
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

  createAppointment(name, description, dueDate, isActive) {
    const appointmentData = { name, description, dueDate, isActive };
    return this.apiClient.post(`appointments/`, appointmentData);
  }
  deleteAppointment(appointmentId) { return this.apiClient.delete(`appointments/${ appointmentId }`)}
  getAppointment(appointmentId) { return this.apiClient.get(`appointments/${ appointmentId }`); }
  getAppointments() { return this.apiClient.get(`appointments/`); }
  updateAppointment(appointmentId, name, description, dueDate, isActive) {
    const appointmentData = { name, description, dueDate, isActive };
    return this.apiClient.put(`appointments/${ appointmentId}`, appointmentData);
  }

  createChore(name, description, priority, interval) {
    const choreData = { name, description, priority, interval };
    return this.apiClient.post(`chores/`, choreData);
  }
  deleteChore(choreId) { return this.apiClient.delete(`chores/${ choreId }`)}
  getChore(choreId) { return this.apiClient.get(`chores/${ choreId }`); }
  getChores() { return this.apiClient.get(`chores/`); }
  updateChore(choreId, name, description, priority, interval) {
    const choreData = { name, description, priority, interval };
    return this.apiClient.put(`chores/${ choreId}`, choreData);
  }

  createProject(name, description, porgress, isActive) {
    const projectData = { name, description, porgress, isActive };
    return this.apiClient.post(`projects/`, projectData);
  }
  deleteProject(projectId) { return this.apiClient.delete(`projects/${ projectId }`)}
  getProject(projectId) { return this.apiClient.get(`projects/${ projectId }`); }
  getProjects() { return this.apiClient.get(`projects/`); }
  updateProjects(projectId, name, description, porgress, isActive) {
    const projectData = { name, description, porgress, isActive };
    return this.apiClient.put(`projects/${ projectId}`, projectData);
  }

  createTask(name, description) {
    const taskData = { name, description };
    return this.apiClient.post(`tasks/`, taskData);
  }
  deleteTask(taskId) { return this.apiClient.delete(`tasks/${ taskId }`)}
  getTask(taskId) { return this.apiClient.get(`tasks/${ taskId }`); }
  getTasks() { return this.apiClient.get(`tasks/`); }
  updateTask(taskId, name, description) {
    const taskData = { name, description };
    return this.apiClient.put(`tasks/${ taskId}`, taskData);
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