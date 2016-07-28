import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Elenco from './components/Elenco';
import Video from './components/Video';
import App from 'components';

export default (
    <Route name="app" component={App} path="/">
        <IndexRoute component={Elenco}/>
        <Route path="video/:video" component={Video}/>
    </Route>
);
