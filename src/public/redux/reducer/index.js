import {combineReducers} from 'redux';

// import all reducer
import engineer from './Engineer';
import company from './Company';
import user from './User';

const rootReducer = combineReducers({
  engineer,
  company,
  user,
});

export default rootReducer;
