import setUpKeys from './scripts/player/Controller';
import Game from './scripts/Game';

setUpKeys();

const game = new Game();

document.getElementById('app')!.appendChild(game.app.view);
