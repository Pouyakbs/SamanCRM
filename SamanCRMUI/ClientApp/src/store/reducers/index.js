// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import darkToggle from './darkToggle';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ 
    darkToggle,
    menu,
});

export default reducers;
