import { Controller, Get } from '@nestjs/common';
const path = require('node:path');
const { exec } = require('node:child_process');
var player = require('play-sound')({})

@Controller('warn')
export class WarnController {
    @Get()
    async warn() {
        const file = path.resolve(__dirname, '../../client/static/audio/PoliceSiren.mp3')

        // exec(`start ${file}`)

        // let beeper = await import('beeper');console.log(beeper)
        // await beeper('****-*-*')

        player.play(file, function (err) {
            if (err) throw err
        })
    }
}
