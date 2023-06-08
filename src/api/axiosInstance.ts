import axios from 'axios';

const apiInstance = axios.create({
    baseURL: `https://uapvirtual.uap.edu.pe:8443/uapmatriculaback/api/`,
});

export default apiInstance;
