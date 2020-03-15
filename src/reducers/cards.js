import {
    SCORE_CARDS,
    DEAL_CARD,
    SET_DECK,
    RESET_GAME
} from '../actions/types';

const initialState = {
    deckId: null,
    remaining: -1,
    dealt: []
};

const cards = (state = initialState, action) => {
    switch (action.type) {
        case SET_DECK:
            return {
                ...state,
                deckId: action.id,
                remaining: action.remaining
            };
        case SCORE_CARDS:
            return {
                ...state,
                dealt: []
            };
        case DEAL_CARD:
            return {
                ...state,
                dealt: state.dealt.concat(action.cards),
                remaining: action.remaining
            };
        case RESET_GAME:
            return {
                ...state,
                remaining: 52,
                dealt: []
            };
        default:
            return state;
    }
};

export default cards;