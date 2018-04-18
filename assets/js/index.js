import React from 'react';
import { render } from 'react-dom';
import { Provider }  from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './App.js';

import "../Resources/css/_all-skins.min.css"
import "../Resources/css/bootstrap.min.css"
import "../Resources/css/AdminLTE.css"
import "../Resources/css/ionicons.min.css"

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)