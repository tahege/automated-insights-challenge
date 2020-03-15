import React from 'react';
import { connect } from 'react-redux';

import {
    resetGame
} from '../actions';

const mapStateToProps = (state, props) => {
    return {
        players: state.players || {},
        cards: state.cards || {}
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onResetGame: (id) => {
            fetch(`https://deckofcardsapi.com/api/deck/${id}/shuffle/`)
                .then(res => res.json())
                .then(data => {
                    dispatch(resetGame());
                });
        }
    };
};

const Scoreboard = ({
    cards,
    players,
    onResetGame
}) => {
    const {
        player1,
        player2
    } = players;
    return (
        <div className="scoreboard">
            <table className="table is-bordered">
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Players</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="player1">
                        <td className={`name ${player1.role}`}>{player1.role}</td>
                        <td>{player1.name}</td>
                        <td align="center">{player1.score}</td>
                    </tr>
                    <tr className="player2">
                        <td className={`name ${player2.role}`}>{player2.role}</td>
                        <td>{player2.name}</td>
                        <td align="center">{player2.score}</td>
                    </tr>
                </tbody>
            </table>
            <div className="admin">
                <button
                    className="button is-link is-outlined"
                    onClick={e => {
                        e.preventDefault();
                        onResetGame(cards.deckId);
                    }}
                >Reset Game</button>
            </div>
        </div>
    );
};

const ScoreboardContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Scoreboard);

export default ScoreboardContainer;