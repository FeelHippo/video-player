import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Root from './root';
import { createBrowserHistory } from 'history';
import LocalStorage from './services/storage';
import api from './services/api';
import { configureStore } from './store/config.js';
import { auth } from './store/types/types';

// render function
const renderApp = props =>
  ReactDOM.render(<Root {...props} />, document.getElementById('root'));

// browser history
const history = createBrowserHistory();

// local storage query
const session = LocalStorage.readLocalStorage() || undefined;

// store config
export const store = configureStore({
  history,
  services: { api },
})({
  session,
})

// sync store, update in case of change
store.subscribe(() => {
  const { lastAction, session } = store.getState();
  if (lastAction.type === auth.LOGIN_USER && session.token) {
    LocalStorage.saveLocalStorage(session);
  }

  if (lastAction.type === auth.LOGOUT_USER) {
    LocalStorage.clearLocalStorage();
  }
})

renderApp({ store, history });

