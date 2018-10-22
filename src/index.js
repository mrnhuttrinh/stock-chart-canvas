import '@babel/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'

import { App } from './components';
import rootSaga from './sagas';

import './index.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, [], compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
