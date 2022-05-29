import setUpKeys from './scripts/player/Controller';
import { Loader } from 'pixi.js';
import Game from './scripts/Game';
import Menu from './scripts/Menu';

setUpKeys();

const loader = Loader.shared;

//Add all assets here:
loader.add('player', '/player/player.json');
loader.add('skeleton', '/enemies/skeleton/skeleton.json');
loader.add('wall', '/wall.png');

const element = document.getElementById('app');

const menu = new Menu(loader);

const game = new Game(loader, element!);

menu.start(game);
