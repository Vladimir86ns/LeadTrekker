import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://leadtracker-52c0e.firebaseio.com/'
});

export default instance;