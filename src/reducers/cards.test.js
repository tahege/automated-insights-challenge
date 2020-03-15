import cardsReducer from './cards';

import {
    SCORE_CARDS,
    DEAL_CARD,
    SET_DECK,
    RESET_GAME
} from '../actions/types';

describe('cards reducer', () => {
    const initialState = {
        deckId: null,
        remaining: -1,
        dealt: []
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
        expect(cardsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_DECK', () => {
        const state1 = {
            deckId: deckId1,
            remaining: remaining1,
            dealt: []
        };
        const state2 = {
            deckId: deckId2,
            remaining: remaining2,
            dealt: []
        };
        expect(
            cardsReducer(initialState, {
                type: SET_DECK,
                id: deckId1,
                remaining: remaining1
            })
        ).toEqual(state1);

        expect(
            cardsReducer(initialState, {
                type: SET_DECK,
                id: deckId2,
                remaining: remaining2
            })
        ).toEqual(state2);
    });

    it('should handle SCORE_CARDS', () => {
        const state1 = {
            deckId: deckId1,
            remaining: remaining1,
            dealt: []
        };
        const state2 = {
            deckId: deckId1,
            remaining: remaining1 - 1,
            dealt: []
        };
        // Initialize the state a little
        const inState1 = cardsReducer(initialState, {
            type: SET_DECK,
            id: deckId1,
            remaining: remaining1
        });

        expect(
            cardsReducer(inState1, {
                type: SCORE_CARDS
            })
        ).toEqual(state1);

        const inState2 = cardsReducer(state1, {
            type: DEAL_CARD,
            cards: [card1],
            remaining: remaining1 - 1
        });

        expect(
            cardsReducer(inState2, {
                type: SCORE_CARDS
            })
        ).toEqual(state2);
    });

    it('should handle DEAL_CARD', () => {
        const state1 = {
            deckId: deckId1,
            remaining: remaining1 - 1,
            dealt: [card1]
        };
        const state2 = {
            deckId: deckId1,
            remaining: remaining1 - 2,
            dealt: [card1, card2]
        };
        const initState = {
            ...initialState,
            deckId: deckId1,
            remaining: remaining1
        }
        expect(
            cardsReducer(initState, {
                type: DEAL_CARD,
                cards: [card1],
                remaining: remaining1 - 1
            })
        ).toEqual(state1);

        expect(
            cardsReducer(state1, {
                type: DEAL_CARD,
                cards: [card2],
                remaining: remaining1 - 2
            })
        ).toEqual(state2);
    });

    it('should handle RESET_GAME', () => {
        const initState = {
            ...initialState,
            deckId: deckId1,
            remaining: remaining1
        };
        const state1 = {
            deckId: deckId1,
            remaining: remaining1,
            dealt: []
        };
        const state2 = {
            deckId: deckId1,
            remaining: 50,
            dealt: [card1, card2]
        };
        expect(
            cardsReducer(initState, {
                type: RESET_GAME
            })
        ).toEqual(state1);

        expect(
            cardsReducer(state2, {
                type: RESET_GAME
            })
        ).toEqual(state1);
    });
});