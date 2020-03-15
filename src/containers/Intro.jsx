import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    setPlayerName
} from '../actions';

import Modal from '../components/Modal';

const mapStateToProps = (state, props) => {
    return {
        cards: state.cards || {}
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetPlayerName: (id, name) => {
            dispatch(setPlayerName(id, name));
        },
    };
};


const Intro = ({
    cards,
    onSetPlayerName
}) => {
    const [names, setNames] = useState(['Thomas', 'Andrea']);
    const [active, setActive] = useState(true);
    useEffect(() => {
        if (cards.remaining === 52 && !active) {
            setActive(true);
        }
    }, [cards.remaining]);
    return (
        <Modal
            active={active}
            title="Hi - Lo Game"
            footer={(
                <button
                    className="start-game button is-primary"
                    tabIndex="3"
                    onClick={e => {
                        e.preventDefault();
                        onSetPlayerName('player1', names[0] || "Player 1");
                        onSetPlayerName('player2', names[1] || "Player 2");
                        setActive(false);
                    }}
                >Start Playing!</button>
            )}
        >
            <div className="rules content">
                <h4>Rules</h4>
                <p>Play consists of a dealer and a player.</p>
                <ol>
                    <li>The dealer draws a card from the top of the deck and places it face up.</li>
                    <li>The player must guess whether the next card drawn from the deck will be higher or lower than the face up card.</li>
                    <li>Once the player guesses, the dealer draws the next card and places it face up on top of the previous card.</li>
                    <li>If the player is correct, go back to step 2.</li>
                    <li>If the player is wrong, the player receives a point for each card in the face up pile, and the face up pile is discarded. Then play begins at step 1 again.</li>
                </ol>
                <p>
                    When the player has made three correct guesses in a row, s/he may make another guess, or choose to pass and the roles are reversed with the face up pile continuing to build.
                    The player may choose to continue if there is a high likelihood that their next guess would be correct.
                    If they are wrong, play starts over at step 1 and the player must again make three correct guesses before being allowed to pass.
                    If they are correct, they can continue or pass.
                    The goal is to end the game with as few points as possible.
                </p>
            </div>
            <hr className="is-thin" />
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Player 1</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Player 1 Name"
                                tabIndex="1"
                                value={names[0]}
                                onChange={e => {
                                    e.preventDefault();
                                    setNames([e.target.value, names[1]]);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Player 2</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Player 2 Name"
                                tabIndex="2"
                                value={names[1]}
                                onChange={e => {
                                    e.preventDefault();
                                    setNames([names[0], e.target.value]);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const IntroContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Intro);

export default IntroContainer;