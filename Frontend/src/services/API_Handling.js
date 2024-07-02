import axios from 'axios';

class ApiService {
    constructor() {
        this.client = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async request(url, method = 'GET', body = null, headers = {}) {
        const apiConfig = {
            method,
            url,
            headers: {
                ...headers,
            },
        }
        if (body) {
            apiConfig.data = JSON.stringify(body);
        }
        const response = await this.client(apiConfig);
        return response;
    }

    get(url, headers = {}) {
        return this.request(url, 'GET', null, headers);
    }
    post(url, body, headers = {}) {
        return this.request(url, 'POST', body, headers);
    }
    patch(url, body, headers = {}) {
        return this.request(url, 'PATCH', body, headers);
    }
    delete(url, headers = {}) {
        return this.request(url, 'DELETE', null, headers);
    }
}

const api = new ApiService();

export default api;