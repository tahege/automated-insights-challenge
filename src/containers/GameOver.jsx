import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    resetGame
} from '../actions';

import Modal from '../components/Modal';

import {
    PLAYER_1,
    PLAYER_2
} from '../constants';

const mapStateToProps = (state, props) => {
    return {
        player1: state.players.player1,
        player2: state.players.player2,
        cards: state.cards || {}
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onResetGame: (id) => {
            fetch(`https://deckofcardsapi.com/api/deck/${id}/shuffle/`)
                .then(res => res.json())
                .then(() => {
                    dispatch(resetGame());
                });
        }
    };
};

const GameOver = ({
    player1,
    player2,
    cards,
    onResetGame
}) => {
    const [active, setActive] = useState(false);
    let winner = null;
    let winnerTitle = "Tie!";
    if (player1.score < player2.score) {
        winner = PLAYER_1;
        winnerTitle = `${player1.name} Wins!`;
    } else if (player2.score < player1.score) {
        winner = PLAYER_2;
        winnerTitle = `${player2.name} Wins!`;
    }
    useEffect(() => {
        if (cards.remaining === 0 && !active) {
            setActive(true);
        }
    }, [cards.remaining]);
    return (
        <Modal
            active={active}
            title={`Game Over: ${winnerTitle}`}
            footer={(
                <button
                    className="start-game button is-primary"
                    tabIndex="3"
                    onClick={e => {
                        e.preventDefault();
                        onResetGame(cards.deckId);
                        setActive(false);
                    }}
                >Play Again!</button>
            )}
        >
            <div className="game-over content">
                <div className={"columns player1" + (winner === PLAYER_1 ? " winner" : "")}>
                    <div className="win column">Winner!</div>
                    <div className="column">{player1.name}</div>
                    <div className="column">{player1.score}</div>
                </div>
                <div className={"columns player2" + (winner === PLAYER_2 ? " winner" : "")}>
                    <div className="win column">Winner!</div>
                    <div className="column">{player2.name}</div>
                    <div className="column">{player2.score}</div>
                </div>
            </div>
        </Modal>
    );
};

const GameOverContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(GameOver);

export default GameOverContainer;