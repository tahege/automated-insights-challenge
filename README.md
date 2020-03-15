# The Challenge
> Since this challenge seemed to target the front-end skills, I decided to use the `Create React App` utility to bootstrap a React environment and am using `Bulma` for styling. 

## Hi - Lo
### The Rules
Play consists of a dealer and a player.

1.    The dealer draws a card from the top of the deck and places it face up.

2.    The player must guess whether the next card drawn from the deck will be higher or lower than the face up card.

3.    Once the player guesses, the dealer draws the next card and places it face up on top of the previous card.

4.    If the player is correct, go back to step 2.

5.    If the player is wrong, the player receives a point for each card in the face up pile, and the face up pile is discarded. Then play begins at step 1 again.

When the player has made three correct guesses in a row, s/he may make another guess, or choose to pass and the roles are reversed with the face up pile continuing to build. The player may choose to continue if there is a high likelihood that their next guess would be correct. If they are wrong, play starts over at step 1 and the player must again make three correct guesses before being allowed to pass. If they are correct, they can continue or pass. The goal is to end the game with as few points as possible.

The App
Your goal is to build a simple web app to implement this game. The Deck Of Cards API should be useful. You can use whatever frameworks you deem useful.

The UI should contain:

·         An image of the current card to guess against.

·         Some indication of whose turn it is.

·         Scores for each player.

·         Number of cards remaining in the deck.

·         Number of cards in the face up pile (i.e., the points on the line).

·         Buttons to guess Hi or Low, which drive the game forward.

·         A button to pass which is disabled unless it is allowed given the current game state.

·         A button to reset the game.

·         High levels of polish on the UI styling are less important than an intuitive interface and working javascript. You can assume this game will be played hotseat style (i.e., two people passing the computer back and forth), so you don't need to implement an AI for player 2.

You can assume that we will be using the Chrome browser to play your game, so there is no need to worry about browser compatibility.

## Create React App Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
