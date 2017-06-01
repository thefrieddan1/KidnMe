import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyD4eu_RrQa30yBqt4ae5BOlCR-BFIprKXc',
    authDomain: 'kidnme-d36d6.firebaseapp.com',
    databaseURL: 'https://kidnme-d36d6.firebaseio.com',
    projectId: 'kidnme-d36d6',
    storageBucket: 'kidnme-d36d6.appspot.com',
    messagingSenderId: '735653802046'
  };
  firebase.initializeApp(config);
}
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
