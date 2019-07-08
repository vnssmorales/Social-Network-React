import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';

firebase.initializeApp({
    apiKey: "AIzaSyAjYfAs6MKgzyTCGnmW8CppXZOgCZcpFac",
    authDomain: "red-social-viajeros-reactjs.firebaseapp.com",
    databaseURL: "https://red-social-viajeros-reactjs.firebaseio.com",
    projectId: "red-social-viajeros-reactjs",
    storageBucket: "gs://red-social-viajeros-reactjs.appspot.com",
    messagingSenderId: "714906699765",
    appId: "1:714906699765:web:e499ee27c289a61c"
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
