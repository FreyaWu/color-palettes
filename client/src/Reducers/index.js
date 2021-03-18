//combine all reducers and export
import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';

export default combineReducers({
    auth,
    message
});