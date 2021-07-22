import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/style/global.css';
import Route from '../src/route/route';
import {Provider} from 'react-redux'
import { createStore ,applyMiddleware} from 'redux'
import {reducer} from './reducer/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
const myStore = createStore(reducer, applyMiddleware(thunk,logger))

ReactDOM.render(
  <Provider store={myStore}>
    <Route/>
  </Provider>,
  document.getElementById('root')
);
