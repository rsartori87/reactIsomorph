import Immutable from 'immutable';

const defaultState = new Immutable.List();

export function data(state = defaultState, action) {
    switch (action.type) {
        case "FETCH_DATA":
            return state.concat(action.res.data.data);
        case "SEARCH_DATA":
            return new Immutable.List().concat(action.res.data.data);
        default:
            return state;
    }
}

export function value(state = '', action) {
    if (action.type === "VALUE_CHANGE") {
        return action.value;
    }
    return state;
}

export function video(state = {}, action) {
    if (action.type === "FETCH_VIDEO") {
        return action.video;
    }
    return state;
}

export function reviver(key, value) {
    var isIndexed = Immutable.Iterable.isIndexed(value);
    return isIndexed ? value.toList() : value.toObject();
}