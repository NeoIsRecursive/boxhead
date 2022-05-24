import setUpKeys from './scripts/player/Controller';
import { Loader } from 'pixi.js';
import Game from './scripts/Game';

setUpKeys();
const loader = Loader.shared;
loader.onError.add((e) => {
  console.log(e);
});
const element = document.getElementById('app');
const game = new Game(loader, element!);
