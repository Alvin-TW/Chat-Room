import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './container/App';
import './custom.sass';

const index = (
    <Provider store={ store }>
        <App />
    </Provider>
)

render(index, document.getElementById('app'))