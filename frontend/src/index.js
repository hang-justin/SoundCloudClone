import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from './context/Modal';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

import './index.css';

// For testing session actions and reducers - phase 1

// FOR TESTING
// Question
// Refactor
// help
// errors
// Set countdown timer to start console logging
// remove before production

const store = configureStore();

const admin = (password) => {
  // guard clause
  if (password !== 'Ay, caramba') return;

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;

}
window.admin = admin;

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
