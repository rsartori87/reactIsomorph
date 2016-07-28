import request from 'axios';

const BACKEND_URL = 'http://localhost:8000/data';

export function fetchData(options) {
    const data = Object.assign({}, {key: '', start: 0}, options);
    return {
        type: 'FETCH_DATA',
        promise: request.post(BACKEND_URL, JSON.stringify(data))
    }
}

export function fetchVideo(id) {
    const url = BACKEND_URL + '/' + id;
    return {
        type: 'FETCH_VIDEO',
        promise: request.get(url)
    }
}

export function searchData(options) {
    const data = Object.assign({}, {key: '', start: 0}, options);
    return {
        type: 'SEARCH_DATA',
        promise: request.post(BACKEND_URL, JSON.stringify(data))
    }
}

export function valueChange(value) {
    return {
        type: 'VALUE_CHANGE',
        value
    }
}