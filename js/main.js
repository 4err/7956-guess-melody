/**
 * Created by Denis on 27.03.2018.
 */

import {printScreen, setScreens} from './utils.js';
import welcomeScreen from './screens/welcome-screen.js';
import genreScreen from "./screens/genre-level-screen.js";
import resultWinScreen from "./screens/win-screen";
import resultTimeoutScreen from "./screens/timeout-screen";
import resultFailScreen from "./screens/fail-screen";
import artistScreen from './screens/artist-level-screen.js';

const SCREENS = {
  welcome: welcomeScreen,
  genre: genreScreen,
  artist: artistScreen,
  resultWin: resultWinScreen,
  resultFail: resultFailScreen,
  resultTimeout: resultTimeoutScreen
};

setScreens(SCREENS);

printScreen(`welcome`);
