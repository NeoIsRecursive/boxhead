import setUpKeys from './scripts/player/Controller';
import { Loader } from 'pixi.js';
import Game from './scripts/Game';

setUpKeys();
const loader = Loader.shared;

//Here we can have a loading bar of some sort
loader.onProgress.add((e) => {
  console.log(e.progress);
});
const errors: string[] = [];
loader.onError.add((e) => {
  errors.push(e.message);
});

//Add all assets here:
loader.add('player', './assets/player/player.json');
loader.add('skeleton', './assets/enemies/skeleton/skeleton.json');

const element = document.getElementById('app');
const game = new Game(loader, element!);

loader.load(() => {
  //just temporary maybe a nice func here later
  if (errors.length > 0) {
    element!.innerHTML =
      'There was an error while loading the content, please try again :)<br>' +
      errors.join('<br>');
  } else {
    game.setup();
  }
});
