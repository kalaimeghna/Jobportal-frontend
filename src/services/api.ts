import axios from "axios";

const API = axios.create({

  baseURL:
    "https://jobport-backend-eyz6.onrender.com/api",

});

export default API;