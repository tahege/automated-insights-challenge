import {
    SET_PLAYER_NAME,
    SWITCH_PLAYER_ROLES,
    SCORE_CARDS,
    RESET_GAME
} from '../actions/types';

import {
    DEALER,
    PLAYER
} from '../constants';

const initialState = {
    player1: {
        name: null,
        score: 0,
        role: PLAYER
    },
    player2: {
        name: null,
        score: 0,
        role: DEALER
    }
};

const players = (state = initialState, action) => {
    let updatedState = {
        player1: Object.assign({}, state.player1),
        player2: Object.assign({}, state.player2)
    };
    switch (action.type) {
        case SET_PLAYER_NAME:
            let updatePlayer = updatedState[action.key];
            updatePlayer.name = action.name;
            return updatedState;
        case SWITCH_PLAYER_ROLES:
            if (updatedState.player1.role === PLAYER) {
                updatedState.player1.role = DEALER;
                updatedState.player2.role = PLAYER;
            } else {
                updatedState.player1.role = PLAYER;
                updatedState.player2.role = DEALER;
            }
            return updatedState;
        case SCORE_CARDS:
            let scorePlayer = updatedState.player1.role === PLAYER ? updatedState.player1 : updatedState.player2;
            scorePlayer.score += action.score;
            return updatedState;
        case RESET_GAME:
            updatedState.player1.score = 0;
            updatedState.player2.score = 0;
            return updatedState;
        default:
            return state;
    }
};

export default players;