import axios from 'axios';

// Create an instance of axios with custom configuration
const axiosInstance = axios.create({
  // Your custom configuration
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // For example, add headers or modify the request
    config.headers['Authorization'] = 'Bearer Token ' + localStorage.getItem('token');
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;