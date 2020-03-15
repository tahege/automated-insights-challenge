import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { setDeck } from './actions';
import appReducers from './reducers';

import 'bulma/css/bulma.css';
import './App.scss';

import Intro from './containers/Intro';
import GameOver from './containers/GameOver';
import PlayArea from './containers/PlayArea';
import Scoreboard from './containers/Scoreboard';

const store = createStore(appReducers);

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(res => res.json())
  .then(data => {
    store.dispatch(setDeck(data.deck_id, data.remaining));
  });



const App = () => (
  <Provider store={store}>
    <div className="app">
      <section>
        <PlayArea />
        <Scoreboard />
      </section>
      <Intro />
      <GameOver />
    </div>
  </Provider>
);

export default App;
