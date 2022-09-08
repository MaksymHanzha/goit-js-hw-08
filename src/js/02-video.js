import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

if (localStorage.getItem(CURRENT_TIME)) {
  setValidTime(localStorage.getItem(CURRENT_TIME));
}

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(CURRENT_TIME, seconds);
}

function setValidTime(seconds) {
  player
    .setCurrentTime(seconds)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    });
}
