import axios from 'axios';

const apiInstance = axios.create({
    baseURL: `https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/`,
});

export default apiInstance;
