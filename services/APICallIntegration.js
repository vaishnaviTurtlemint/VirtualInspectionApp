import axios, {AxiosInstance} from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://9d20-49-249-205-150.ngrok-free.app/',
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
  await axiosInstance
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
      console.log("error in form", error);
    });
}

export async function PostWithJson(path, requestObject) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(path, requestObject, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
