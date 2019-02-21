import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-75e74.firebaseio.com/'
});

export default instance;