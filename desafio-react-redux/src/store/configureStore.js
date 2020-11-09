import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import photos from './photos';
import login from './login';
import localStorage from './middleware/localStorage';

const middleware = [...getDefaultMiddleware(), localStorage];
const reducer = combineReducers({ login, photos });

const store = configureStore({ reducer, middleware });
export default store;
