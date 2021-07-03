import axios from "axios";
import { BASE_URL } from "../configs/Variables";
const http = axios.create();
http.defaults.baseURL = BASE_URL;
export { http };
