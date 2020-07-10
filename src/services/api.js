import Axios from "axios";

let urls = {
    test: `https://api.tvmaze.com`,
    development: 'https://api.tvmaze.com',
    production: 'https://api.tvmaze.com'
}

const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;