import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';
import './styles/base.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initStore from './store';
import 'whatwg-fetch';

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
