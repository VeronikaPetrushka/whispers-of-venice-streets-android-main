/**
 * @format
 */

import MapboxGL from '@rnmapbox/maps';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

MapboxGL.setAccessToken('pk.eyJ1IjoidnBldHJ1c2hrYSIsImEiOiJjbWRpbGNpejAwZG9yMmxxeXFienZ2ZDh1In0.047N7PJJbsPsxLJY2ehUlA');

AppRegistry.registerComponent(appName, () => App);
