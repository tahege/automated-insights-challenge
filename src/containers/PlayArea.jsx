import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGreaterThanEqual,
    faLessThanEqual,
    faNotEqual
} from '@fortawesome/free-solid-svg-icons';

import {
    dealCard,
    scoreCards,
    switchPlayerRoles
} from '../actions';

import { cardValueToInteger } from '../utils';

import Card from '../components/Card';
import SlimPanel from '../components/SlimPanel';

const DEALER = "dealer";
const HI = "HI";
const LO = "LO";

const mapStateToProps = (state, props) => {
    let player, dealer;
    if (state.players.player1.role === DEALER) {
        dealer = "player1";
        player = "player2";
    } else {
        dealer = "player2";
        player = "player1";
    }
    return {
        cards: state.cards || {},
        players: state.players || {},
        dealer,
        player
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDealCard: (id, cb) => {
            fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
                .then(res => res.json())
                .then(data => {
                    dispatch(dealCard(data.cards, data.remaining));
                    cb(data.cards.length ? data.cards[0] : null)
                });
        },
        onScoreCards: (score) => {
            dispatch(scoreCards(score));
        },
        onPass: () => {
            dispatch(switchPlayerRoles());
        }
    };
};


const PlayArea = ({
    cards,
    players,
    dealer,
    player,
    onDealCard,
    onScoreCards,
    onPass
}) => {
    const [guess, setGuess] = useState(null);
    const [streak, setStreak] = useState(0);
    const [prevMatchup, setPrevMatchup] = useState(null);
    const revealedCards = cards.dealt.length;
    const topCard = revealedCards ? cards.dealt[revealedCards - 1] : null;

    useEffect(() => {
        if (cards.remaining === 52) {
            setGuess(null);
            setStreak(0);
            setPrevMatchup(null);
        }
    }, [cards.remaining]);

    return (
        <div className="play-area">
            <div className="dealer">
                <SlimPanel
                    className={`dealer-actions ${dealer}`}
                    title={`Dealer (${players[dealer].name})`}
                >
                    <Card
                        className={`deck has-${cards.remaining}`}
                        onClick={e => {
                            e.preventDefault();
                            onDealCard(cards.deckId, (nextCard) => {
                                if (topCard) {
                                    let result = null;
                                    if (guess === HI) {
                                        result = cardValueToInteger(nextCard.value) >= cardValueToInteger(topCard.value);
                                    } else {
                                        result = cardValueToInteger(nextCard.value) <= cardValueToInteger(topCard.value);
                                    }
                                    if (result) {
                                        setStreak(streak + 1);
                                    } else {
                                        setStreak(0);
                                        onScoreCards(cards.dealt.length + 1);
                                    }
                                    setGuess(null);
                                    setPrevMatchup([result, nextCard, topCard, guess]);
                                } else {
                                    setPrevMatchup([null, null, nextCard, null]);
                                }
                            });
                        }}
                        disable={!guess && revealedCards}
                    />
                    <div className="remaining">Remaining: {cards.remaining}</div>
                </SlimPanel>
            </div>
            <SlimPanel className="dealt-cards">
                <Card
                    className={`has-${revealedCards}`}
                    image={topCard ? topCard.image : null}
                    alt={topCard ? `${topCard.value} of ${topCard.suit}` : "Empty"}
                />
                <div className="count">Total Dealt: {revealedCards}</div>
            </SlimPanel>
            <div className="player">
                <SlimPanel
                    className={`player-actions ${player}`}
                    title={`Player (${players[player].name})`}
                >
                    <button
                        className={"button" + (player === "player1" ? " is-link" : " is-primary") + (guess === HI ? "" : " is-outlined")}
                        disabled={!Boolean(revealedCards)}
                        onClick={e => {
                            e.preventDefault();
                            setGuess(HI);
                            setPrevMatchup([null, null, topCard, null]);
                        }}
                    >
                        <span className="icon"><FontAwesomeIcon icon={faGreaterThanEqual} /></span>
                        <span>Hi</span>
                    </button>
                    <div>Current Card: {topCard && topCard.value}</div>
                    <button
                        className={"button" + (player === "player1" ? " is-link" : " is-primary") + (guess === LO ? "" : " is-outlined")}
                        disabled={!Boolean(revealedCards)}
                        onClick={e => {
                            e.preventDefault();
                            setGuess(LO);
                            setPrevMatchup([null, null, topCard, null]);
                        }}
                    >
                        <span className="icon"><FontAwesomeIcon icon={faLessThanEqual} /></span>
                        <span>Lo</span>
                    </button>
                    <div>Guesses Left: {Math.max(3 - streak, 0)}</div>
                    <button
                        className="button is-outlined"
                        onClick={e => {
                            e.preventDefault();
                            onPass();
                            setGuess(null);
                            setStreak(0);
                        }}
                        disabled={Boolean(Math.max(3 - streak, 0))}
                    >Pass</button>
                </SlimPanel>
                <SlimPanel
                    className={"previous-matchup" + (!guess && prevMatchup && prevMatchup[0] !== null ? prevMatchup[0] ? " result-good" : " result-bad" : "")}
                    title="Comparison"
                >
                    {prevMatchup && prevMatchup[1] ?
                        <Card
                            className="has-1"
                            image={prevMatchup[1].image}
                        />
                        :
                        <Card
                            className="deck has-0"
                            image="logo"
                            alt="Empty"
                        />
                    }
                    <div className="comparator">
                        {guess ?
                            <FontAwesomeIcon icon={guess === HI ? faGreaterThanEqual : faLessThanEqual} />
                            :
                            null
                        }
                        {!guess ?
                            prevMatchup && prevMatchup[3] ?
                                <FontAwesomeIcon icon={prevMatchup[3] === HI ? faGreaterThanEqual : faLessThanEqual} />
                                :
                                <FontAwesomeIcon className="fade-out" icon={faNotEqual} />
                            :
                            null
                        }
                    </div>
                    {prevMatchup && prevMatchup[2] ?
                        <Card
                            className="has-1"
                            image={prevMatchup[2].image}
                        />
                        :
                        <Card
                            className="deck has-0"
                            image="logo"
                            alt="Empty"
                        />
                    }
                </SlimPanel>
            </div>
        </div>
    );
};

const PlayAreaContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(PlayArea);

export default PlayAreaContainer;