import * as actions from './index';
import * as types from './types';

describe("actions", () => {
    it("setDeck() should create an action to set the deck info", () => {
        const id = `test1`;
        const remaining = 10;
        const expected = {
            type: types.SET_DECK,
            id,
            remaining
        }

        expect(actions.setDeck(id, remaining)).toEqual(expected);
    });

    it("setPlayerName() should create an action to set the name for the specified player", () => {
        const key = 1;
        const name = "Player 1";
        const expected = {
            type: types.SET_PLAYER_NAME,
            key,
            name
        }

        expect(actions.setPlayerName(key, name)).toEqual(expected);
    });

    it("switchPlayerRoles() should create an action to switch the player roles", () => {
        const expected = {
            type: types.SWITCH_PLAYER_ROLES
        }

        expect(actions.switchPlayerRoles()).toEqual(expected);
    });

    it("scoreCards() should create an action to score the cards on the current player", () => {
        const score = 10;
        const expected = {
            type: types.SCORE_CARDS,
            score
        }

        expect(actions.scoreCards(score)).toEqual(expected);
    });

    it("dealCard() should create an action to set the drawn cards and update the remaining total", () => {
        const cards = [{
            image: "card.png",
            value: "2",
            suit: "HEARTS",
            code: "2H"
        }];
        const remaining = 51;
        const expected = {
            type: types.DEAL_CARD,
            cards,
            remaining
        }

        expect(actions.dealCard(cards, remaining)).toEqual(expected);
    });

    it("resetGame() should create an action to reset the game state", () => {
        const house = "test_house";
        const expected = {
            type: types.RESET_GAME
        }

        expect(actions.resetGame()).toEqual(expected);
    });
});