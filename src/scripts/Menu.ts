import type GameMap from '../types/GameMap';
import maps from '../../public/maps/';
import { Loader } from 'pixi.js';
import Game from './Game';

export default class Menu {
  constructor(loader: Loader) {
    this.#loader = loader;

    //Here we can have a loading bar of some sort
    loader.onProgress.add((e) => {
      console.log(e.progress);
    });

    loader.onError.add((e) => {
      this.#errors.push(e.message);
    });

    document.body.appendChild(this.#optionsContainer);
    this.#mapPreview.appendChild(this.#selectedElement);
    this.#optionsContainer.appendChild(this.#mapPreview);
    this.#optionsContainer.appendChild(this.#errorContainer);
  }
  #loader;
  #optionsContainer = document.createElement('div');
  #selectedMap?: GameMap;
  #mapPreview = document.createElement('div');
  #selectedElement = document.createElement('p');
  #errorContainer = document.createElement('div');
  #errors: string[] = [];

  #changeMap(x?: GameMap) {
    if (x !== undefined) {
      this.#selectedElement.textContent = x.name;
      this.#selectedMap = x;
      this.#previewMap(x);
    } else {
      this.#selectedElement.textContent = 'none';
      this.#selectedMap = undefined;
    }
  }

  #previewMap(x: GameMap) {
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('preview');
    x.map.forEach((row) => {
      const mapLine = document.createElement('p');
      mapLine.textContent = row;
      previewContainer.appendChild(mapLine);
    });

    this.#mapPreview.replaceChildren(previewContainer);
  }

  #getAllMapOption() {
    this.#changeMap();
    maps.forEach((gameMap) => {
      const button = document.createElement('button');
      button.textContent = gameMap.name;
      button.addEventListener('click', () => {
        this.#changeMap(gameMap);
      });
      this.#optionsContainer.appendChild(button);
    });
  }

  #addError(x: string) {
    const error = document.createElement('p');
    error.textContent = x;
    this.#errorContainer.appendChild(error);
  }

  start(game: Game) {
    const startGame = () => {
      if (this.#selectedMap !== undefined) {
        this.#loader.load(() => {
          if (this.#errors.length > 0) {
            this.#errors.forEach((e) => this.#addError(e));
          } else {
            this.#optionsContainer.remove();
            game.setup(this.#selectedMap!);
          }
        });
      } else {
        this.#addError('select a map');
      }
    };
    this.#getAllMapOption();
    const playButton = document.createElement('button');
    playButton.textContent = 'play';
    playButton.addEventListener('click', startGame);
    this.#optionsContainer.appendChild(playButton);
  }
}
