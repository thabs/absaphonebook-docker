import axios from 'axios';
import {MainConfig} from 'configs';

const config = MainConfig.apiSettings;

const axiosConfigs = {
  baseURL: MainConfig.baseURL,
  timeout: config.timeout,
  headers: config.headers,
};

const instance = axios.create(axiosConfigs);

//! Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      return Promise.reject({message: error.request});
    } else return Promise.reject(error);
  },
);

export default instance;
