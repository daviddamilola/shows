import Axios from "axios";

let urls = {
    test: `https://api.tvmaze.com/singlesearch/shows/`,
    development: 'https://api.tvmaze.com/singlesearch/shows/',
    production: 'https://api.tvmaze.com/singlesearch/shows/'
}

const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;