import setUpKeys from './scripts/player/Controller';
import { Loader, Application } from 'pixi.js';
import Game from './scripts/Game';

setUpKeys();
const app = new Application({
  backgroundColor: 0xfafafa,
});
const loader = Loader.shared;
loader.onError.add((e) => {
  console.log(e);
});

loader.add('player', './assets/player/player.json');

const element = document.getElementById('app');
const game = new Game(app, loader, element!);

loader.load(() => game.setup());
