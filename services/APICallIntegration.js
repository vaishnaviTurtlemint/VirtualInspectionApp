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
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('api/image-upload', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(function (error) {
        // handle error
        console.log('error in form', error);
        reject(error);
      });
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

export async function getVehicleDetails(regNo) {
  return new Promise((resolve, reject) => {
    console.log('coming ', regNo);
    axios({
      method: 'get',
      url: `http://10.0.2.2:9000/api/v1/vehicle-details?regNo=${regNo}`,
      headers: {
        'Access-Control-Allow-Origin': '*', // Set the allowed origin(s) here, or use a specific domain instead of '*'
        'Access-Control-Allow-Methods': 'GET',
        'broker': 'turtlemint',
        'tenant': 'turtlemint',
        'Cookie':
          'PLAY_SESSION=8d9ef4a06694d59fed19d574fa2f37c6ad10a42b-broker=turtlemint',
      },
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
