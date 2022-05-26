import setUpKeys from './scripts/player/Controller';
import { Loader } from 'pixi.js';
import Game from './scripts/Game';
import maps from '../public/maps/';
import GameMap from './types/GameMap';
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
loader.add('player', '/player/player.json');
loader.add('skeleton', '/enemies/skeleton/skeleton.json');
loader.add('wall', '/wall.png');

const element = document.getElementById('app');
const game = new Game(loader, element!);

let selectedMap: GameMap;

const optionsContainer = document.createElement('div');
document.body.appendChild(optionsContainer);

const selected = document.createElement('p');
selected.textContent = 'none';
optionsContainer.appendChild(selected);

maps.forEach((gameMap) => {
  const button = document.createElement('button');
  button.textContent = gameMap.name;
  button.addEventListener('click', () => {
    selectedMap = gameMap;
    selected.textContent = gameMap.name;
  });
  optionsContainer.appendChild(button);
});

const startGame = () => {
  if (selectedMap !== undefined) {
    loader.load(() => {
      //just temporary maybe a nice func here later
      if (errors.length > 0) {
        element!.innerHTML =
          'There was an error while loading the content, please try again :)<br>' +
          errors.join('<br>');
      } else {
        optionsContainer.remove();
        game.setup(selectedMap);
      }
    });
  }
};

const playButton = document.createElement('button');
playButton.textContent = 'play';
playButton.addEventListener('click', startGame);

optionsContainer.appendChild(playButton);
