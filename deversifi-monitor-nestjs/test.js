
const file = 'D:\\001-ProgrammingProjects\\LearningNodeJS\\nestjs-test\\client\\static\\audio\\PoliceSiren.mp3'
const file2 = 'D:\\001-ProgrammingProjects\\LearningNodeJS\\nestjs-test\\client\\static\\audio\\TornadoSiren.mp3'

// const { exec } = require('node:child_process');
// exec(`start ${file}`)


/**
 * 系统提示音（无法自定义所播放的音频）。
 */
// 系统提示音，方法一。
// console.log("\x07")

// 系统提示音，方法二。
// const { exec } = require('node:child_process');
// require("child_process").exec("powershell.exe [console]::beep(500,600)")

// 系统提示音，方法三。
// exec(`rundll32 user32.dll, MessageBeep`)




// const Troubadour = require('troubadour');
// const troubadour = new Troubadour('vlc');
// troubadour.play(`${file}`);


const fs = require('fs')
const { Readable, Stream } = require('stream');
const lame = require("@suldashi/lame");
// const Lame = require("node-lame").Lame;
const Speaker = require('speaker');
var pcm = require('pcm');

// var stream = fs.createReadStream(file);
// var decoder = new lame.Decoder();
// var speaker;

// stream.pipe(decoder).on('format', function(format) {
//     speaker = new Speaker(format);
//     this.pipe(speaker);
// });

// Create the Speaker instance
const speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

// var stream = fs.createReadStream(file);
// stream.pipe(speaker);

// // PCM data from stdin gets piped into the speaker
// const decoder = new Lame({
//     output: "buffer",
//     quality: 9
// }).setFile(file);
// decoder
//     .decode()
//     .then(() => {
//         // Decoding finished
//         const buffer = decoder.getBuffer();
//         const stream = Readable.from(buffer.toString());
//         stream.pipe(speaker);
//     });
// // process.stdin.pipe(speaker);




// var min = 1.0;
// var max = -1.0;

// pcm.getPcmData(file, { stereo: true, sampleRate: 44100 },
//   function(sample, channel) {
//     // Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
//     min = Math.min(min, sample);
//     max = Math.max(max, sample);
//     sample.pipe(speaker);
//   },
//   function(err, output) {
//     if (err)
//       throw new Error(err);
//     console.log('min=' + min + ', max=' + max);
//   }
// );


// https://nodejs.org/api/stream.html#readablepause
const stream = fs.createReadStream(file)
stream.pipe(new lame.Decoder)
  .on('format', console.log)
  .pipe(speaker);

setTimeout(() => {
  speaker.close()
}, 5000);


// const stream2 = fs.createReadStream(file2)
// stream2.pipe(new lame.Decoder)
// .on('format', console.log)
// .pipe(new Speaker);



; (async () => {

  test(wait)

  async function test() {
    const arr = ['AAA', 'BBB', 'CCC', 'DDD']
    for (const iterator of arr) {
      await wait(() => { }, 3000)
      console.log(iterator)
    }
  }


  async function wait(callback, ms, ...params) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await callback(params)
        resolve(ms)
      }, ms, params)
    })
  }
})()