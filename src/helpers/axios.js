import axios from "axios";
import {api} from "../urlConfig.js";

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
})


export default axiosInstance