import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";
import 'firebase/auth';
import middlewareLogger from './middleware/middleware-logger';
import thunkMiddleware from 'redux-thunk';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MyProvider from './context'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, middlewareLogger));

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyProvider>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </ReactReduxFirebaseProvider>
      </MyProvider>
    </Provider>
  </React.StrictMode >
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();