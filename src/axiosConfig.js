import axios from 'axios'

const axiosBase = axios.create({
  baseURL: "https://forum-backend-7cdw.onrender.com/api",
});

export default axiosBase

//http://localhost:3000/api