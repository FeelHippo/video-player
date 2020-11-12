import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './index.css';
import App from './components/App';
import { SnackbarProvider } from 'notistack';

const Root = ({ store, history, ...props }) => (
  <Provider store={store}>
    <Router history={history}>
      <SnackbarProvider maxSnack={2}>
        <Suspense fallback={null}>
          <App {...props} />
        </Suspense>
      </SnackbarProvider>
    </Router>
  </Provider>
)

export default Root;
