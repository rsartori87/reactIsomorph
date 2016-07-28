import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { data, value, video, reviver } from '../shared/reducers/reducer';
import { Router, browserHistory } from 'react-router';
import routes from '../shared/routes';
import promiseMiddleware from '../shared/lib/promiseMiddleware';
import { fromJS } from 'immutable';
import logger from 'redux-logger';

const history = browserHistory;
let initialState = window.__INITIAL_STATE__;
const reducer = combineReducers({data, value, video});
const middleware = applyMiddleware(promiseMiddleware, logger());

Object.keys(initialState).forEach(key => {
    initialState[key] = fromJS(initialState[key], reviver);
});

const store = createStore(reducer, initialState, middleware);

render (
    <Provider store={store}>
        <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
);