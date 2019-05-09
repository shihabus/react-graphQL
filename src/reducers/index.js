import { combineReducers } from 'redux';

import issues from './issueReducer';

export default combineReducers({
    issues,
});