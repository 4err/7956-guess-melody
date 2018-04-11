/**
 * Created by Denis on 27.03.2018.
 */

import {startGame, setScreens} from './utils.js';
import welcomeScreen from './screens/welcome-screen.js';
import genreScreen from "./screens/genre-level-screen.js";
import resultScreen from "./screens/result-screen";
import artistScreen from './screens/artist-level-screen.js';
import header from "./screens/header";

const SCREENS = {
  welcome: {
    isLevel: false,
    type: `welcome`,
    template: welcomeScreen
  },
  header: {
    isLevel: false,
    type: ``,
    template: header
  },
  genre: {
    isLevel: true,
    type: `genre`,
    template: genreScreen
  },
  artist: {
    isLevel: true,
    type: `artist`,
    template: artistScreen
  },
  result: {
    isLevel: false,
    type: `result`,
    template: resultScreen
  }
};

setScreens(SCREENS);

startGame();
