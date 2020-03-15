import playersReducer from './players';

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

describe('players reducer', () => {
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
    const card1 = {
        image: "card.png",
        value: "2",
        suit: "HEARTS",
        code: "2H"
    };
    const card2 = {
        image: "card.png",
        value: "3",
        suit: "HEARTS",
        code: "3H"
    };
    const deckId1 = "test1";
    const deckId2 = "test2";
    const remaining1 = 52;
    const remaining2 = 10;

    it('should return the initial state', () => {
        expect(playersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_PLAYER_NAME', () => {
        const state1 = {
            player1: Object.assign({}, initialState.player1, { name: "a" }),
            player2: Object.assign({}, initialState.player2)
        };
        const state2 = {
            player1: Object.assign({}, initialState.player1),
            player2: Object.assign({}, initialState.player2, { name: "b" })
        };
        const initState = {
            player1: Object.assign({}, initialState.player1, { name: "a" }),
            player2: Object.assign({}, initialState.player2, { name: "b" })
        };
        const state3 = {
            player1: Object.assign({}, initialState.player1, { name: "Tod" }),
            player2: Object.assign({}, initialState.player2, { name: "b" })
        };
        const state4 = {
            player1: Object.assign({}, initialState.player1, { name: "a" }),
            player2: Object.assign({}, initialState.player2, { name: "Becky" })
        };
        expect(
            playersReducer(initialState, {
                type: SET_PLAYER_NAME,
                key: "player1",
                name: "a"
            })
        ).toEqual(state1);
        expect(
            playersReducer(initialState, {
                type: SET_PLAYER_NAME,
                key: "player2",
                name: "b"
            })
        ).toEqual(state2);
        expect(
            playersReducer(initState, {
                type: SET_PLAYER_NAME,
                key: "player1",
                name: "Tod"
            })
        ).toEqual(state3);
        expect(
            playersReducer(initState, {
                type: SET_PLAYER_NAME,
                key: "player2",
                name: "Becky"
            })
        ).toEqual(state4);
    });

    it('should handle SWITCH_PLAYER_ROLES', () => {
        const initState = {
            player1: Object.assign({}, initialState.player1, { name: "a" }),
            player2: Object.assign({}, initialState.player2, { name: "b" })
        };
        const state1 = {
            player1: Object.assign({}, initialState.player1, { role: DEALER, name: "a" }),
            player2: Object.assign({}, initialState.player2, { role: PLAYER, name: "b" })
        };
        const state2 = {
            player1: Object.assign({}, initialState.player1, { role: PLAYER, name: "a" }),
            player2: Object.assign({}, initialState.player2, { role: DEALER, name: "b" })
        };

        expect(
            playersReducer(initState, {
                type: SWITCH_PLAYER_ROLES
            })
        ).toEqual(state1);

        expect(
            playersReducer(state1, {
                type: SWITCH_PLAYER_ROLES
            })
        ).toEqual(state2);
    });

    it('should handle SCORE_CARDS', () => {
        const initState = {
            player1: Object.assign({}, initialState.player1, { name: "a" }),
            player2: Object.assign({}, initialState.player2, { name: "b" })
        };
        const state1 = {
            player1: Object.assign({}, initState.player1, { score: 10 }),
            player2: Object.assign({}, initState.player2)
        };
        const state2 = {
            player1: Object.assign({}, initState.player1, { score: 20 }),
            player2: Object.assign({}, initState.player2)
        };
        const state4 = {
            player1: Object.assign({}, initState.player1, { role: DEALER, score: 20 }),
            player2: Object.assign({}, initState.player2, { role: PLAYER, score: 10 })
        };
        const score = 10;
        expect(
            playersReducer(initState, {
                type: SCORE_CARDS,
                score
            })
        ).toEqual(state1);

        expect(
            playersReducer(state1, {
                type: SCORE_CARDS,
                score
            })
        ).toEqual(state2);

        const state3 = playersReducer(state2, {
            type: SWITCH_PLAYER_ROLES
        });

        expect(
            playersReducer(state3, {
                type: SCORE_CARDS,
                score
            })
        ).toEqual(state4);
    });

    it('should handle RESET_GAME', () => {
        const initState = {
            player1: Object.assign({}, initialState.player1),
            player2: Object.assign({}, initialState.player2)
        };
        initState.player1.score = 10;
        initState.player2.score = 20;

        expect(
            playersReducer(initState, {
                type: RESET_GAME
            })
        ).toEqual(initialState);
    });
});