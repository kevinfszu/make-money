
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
// const Lame = require("node-lame").Lame;    // 这个库已无人维护，请用 @suldashi/lame 替代
const lame = require("@suldashi/lame");
const Speaker = require('speaker');

// Create the Speaker instance
const speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

// https://nodejs.org/api/stream.html#readablepause
const stream = fs.createReadStream(file)
stream.pipe(new lame.Decoder)
  .on('format', console.log)
  .pipe(speaker);

setTimeout(() => {
  speaker.close()
}, 5000);

// var stream = fs.createReadStream(file);
// var decoder = new lame.Decoder();
// var speaker;

// stream.pipe(decoder).on('format', function(format) {
//     speaker = new Speaker(format);
//     this.pipe(speaker);
// });


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




// const stream2 = fs.createReadStream(file2)
// stream2.pipe(new lame.Decoder)
// .on('format', console.log)
// .pipe(new Speaker);


