import axios, { AxiosInstance } from "axios";
import { BE_SERVICE_BASE_URL } from "../constants/API-constant"

const axiosInstance = axios.create({ "baseURL": 'https://pro.turtlemint.com/' });

export async function getUser() {
    
    axiosInstance.get("api/healthCheck").then((response) => {
        console.log(response);
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
        .finally(function () {
            console.log("finally");

            // always executed
        })
};

