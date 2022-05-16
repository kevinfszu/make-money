
import Player from 'play-sound';
import path from 'path';
const player = new Player();
console.log(player);

let audio = player.play(`client/static/audio/WoopWoop.mp3`, function (err) {
  if (err && !err.killed) throw err;
});
// audio.kill();


(0, () => { console.log('hello') })()
