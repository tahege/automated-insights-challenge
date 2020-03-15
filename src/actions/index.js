import {
    SET_DECK,
    SET_PLAYER_NAME,
    SWITCH_PLAYER_ROLES,
    SCORE_CARDS,
    DEAL_CARD,
    RESET_GAME
} from './types';

export const setDeck = (id, remaining) => {
    return {
        type: SET_DECK,
        id,
        remaining
    }
}

export const setPlayerName = (id, name) => {
    return {
        type: SET_PLAYER_NAME,
        id,
        name
    }
}

export const switchPlayerRoles = () => {
    return {
        type: SWITCH_PLAYER_ROLES
    }
}

export const scoreCards = (score) => {
    return {
        type: SCORE_CARDS,
        score
    }
}

export const dealCard = (cards, remaining) => {
    return {
        type: DEAL_CARD,
        cards,
        remaining
    }
}

export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}