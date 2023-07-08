import axios, {AxiosInstance} from 'axios';
import {BE_SERVICE_BASE_URL} from '../constants/API-constant';

const axiosInstance = axios.create({
  baseURL: 'https://a66b-49-249-199-134.ngrok-free.app/',
});

export async function getUser() {
  axiosInstance
    .get('api/healthCheck')
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      console.log('finally');

      // always executed
    });
}

export async function submitFormData(formData) {
  axiosInstance
    .post('api/image-upload', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
}
