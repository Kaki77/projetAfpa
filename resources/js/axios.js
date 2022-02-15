import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'http://projet.test',
    withCredentials: true,
});
 
export default apiClient;