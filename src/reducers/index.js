import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import remediesReducer from './remedies-reducer';


const rootReducer = combineReducers(
  {

    firestore: firestoreReducer,
    isLoading: remediesReducer,
    error: remediesReducer,
    remedies: remediesReducer
  });

export default rootReducer;