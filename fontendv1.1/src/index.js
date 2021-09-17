import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import $ from 'jquery';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/store'
// importation de la librairie d'icones fontawesone
//import './fontawesome';

import { PersistGate } from "redux-persist/lib/integration/react";

window.jQuery = $;

const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store}>
       <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
