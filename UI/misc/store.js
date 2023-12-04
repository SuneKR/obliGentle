// Import
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

//Local imports
import { reducers } from '../misc';

export default createStore(reducers, applyMiddleware(thunk));

