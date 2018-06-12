import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/blog';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/app';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
  </Provider>, document.querySelector('.container'));