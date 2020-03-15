import { combineReducers } from 'redux';

import players from './players';
import cards from './cards';

const appReducers = combineReducers({
    players,
    cards
});

export default appReducers;