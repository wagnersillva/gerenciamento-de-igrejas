import axios from "axios";
import { SERVER_URL, CLIENT_URL } from "../config";
import history from "../services/history";
import {notification} from "antd";

const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: false
});

api.setAuth = (response) => {
  const { access_token, permissions, churches, user } = response.data;
  localStorage.setItem("token", access_token);
  localStorage.setItem("user", JSON.stringify({...user, permissions, churches}));
};

api.unsetAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if(window.location.pathname !== '/auth/login'){
    window.location = CLIENT_URL + '/auth/login';
  }
};

api.logout = ({ redirectTimeout } = {}) => {
  if (!!localStorage.getItem("token")) {
    setTimeout(function() {
      history.push(`${CLIENT_URL}/`);
    }, redirectTimeout);
  }

  api.unsetAuth();
};

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use(
    response => mapResponseToUsefulData(response),
    error => requestFailed(error)
);

const mapResponseToUsefulData = (response) => {
  const { message, ...rest } = response.data;
  if(message) notification.success({ message });

  return rest;
}

const requestFailed = (error) => {
  let message = "";
  let { status } = error?.response;

  if(error?.response?.data?.message?.error){
    message = error?.response?.data?.message?.error;
  } if(error?.response?.data?.error?.message){
    message = error?.response?.data?.error?.message;
  } else if(error?.response?.data?.message) {
    message = error?.response?.data?.message;
  } else if(error?.response?.message) {
    message = error?.response?.message
  } else {
    message = "Ocorreu um erro no servidor. Tente novamente mais tarde ou contate um administrador.";
  }

  if(status === 401) api.unsetAuth();

  return Promise.reject(message);
}

const token = localStorage.getItem('token');

api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : undefined;

export default api;
