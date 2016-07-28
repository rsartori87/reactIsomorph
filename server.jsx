import express from 'express';
import React from 'react';
import server from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import routes from './shared/routes';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { data, value, video, reviver } from './shared/reducers/reducer';
import { fetchData, fetchVideo } from './shared/actions/dataAction';
import Immutable, { fromJS } from 'immutable';
import promiseMiddleware from './shared/lib/promiseMiddleware';
const app = express();

app.use((req, res) => {

    const history = createMemoryHistory();
    const location = history.createLocation({ pathname: req.url })
    const middleware = applyMiddleware(promiseMiddleware);
    const reducer = combineReducers({data, value, video});

    match({ routes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.log(err);
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) return res.status(404).end('Not found.');

        function renderView(store) {
            const InitialComponent = (
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            const initialState = store.getState();

            const componentHTML = server.renderToString(InitialComponent);

            const HTML = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
                            integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
                            crossorigin="anonymous">
                        <style>
                            .grid-item {
                                width: 20%;
                                box-shadow: 5px 5px 5px rgba(0, 0, 0, .3);
                                margin-bottom: 10px;
                            }

                            .grid-item:hover {
                                box-shadow: 5px 5px 5px rgba(0, 0, 0, .6);}
                        </style>
                        <title>Isomorphic redux</title>
                        <script type="application/javascript">
                            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                        </script>
                    </head>
                    <body>
                        <div id="react-view">${componentHTML}</div>
                        <script type="application/javascript" src="/bundle.js"></script>
                    </body>
                </html>`;
            return HTML;
        }

        if (req.url === '/') {
            fetchData().promise.then((response) => {
                const status = {
                    data: fromJS(response.data.data, reviver),
                    value: '',
                    video: {}
                };
                const store = createStore(reducer, status, middleware);
                res.end(renderView(store));
            });
        } else {
            var id = req.url.split("/")[2];
            fetchVideo(id).promise.then((response) => {
                const status = {
                    data: new Immutable.List(),
                    value: '',
                    video: response.data
                };
                const store = createStore(reducer, status, middleware);
                res.end(renderView(store));
            })
            .catch((error) => {
                console.log(error);
            });
        }

    });
});

export default app;
