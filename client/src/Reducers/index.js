//combine all reducers and export
import {combineReducers} from 'redux';
import auth from './auth';

export default combineReducers({auth});