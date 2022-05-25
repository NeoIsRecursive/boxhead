import setUpKeys from './scripts/player/Controller';
import { Loader } from 'pixi.js';
import Game from './scripts/Game';

setUpKeys();
const loader = Loader.shared;

//Here we can have a loading bar of some sort
loader.onProgress.add((e) => {
  console.log(e.progress);
});

//Add all assets here:
loader.add('player', './assets/player/player.json');
loader.add('skeleton', './assets/enemies/skeleton/skeleton.json');

const element = document.getElementById('app');
const game = new Game(loader, element!);

loader.load(() => game.setup());
