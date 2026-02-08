import axios from 'axios';

const API_URL = 'http://10.0.2.2:5002/api'; // 10.0.2.2 is the alias for localhost on the host machine from the Android emulator

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
