"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundPlayController = void 0;
const common_1 = require("@nestjs/common");
const play_sound_1 = require("play-sound");
let SoundPlayController = class SoundPlayController {
    play(audioName) {
        console.log(play_sound_1.default);
        const test = (0, play_sound_1.default)();
        test.test();
    }
};
__decorate([
    (0, common_1.Get)(':audioName'),
    __param(0, (0, common_1.Param)('audioName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SoundPlayController.prototype, "play", null);
SoundPlayController = __decorate([
    (0, common_1.Controller)('sound-play')
], SoundPlayController);
exports.SoundPlayController = SoundPlayController;
//# sourceMappingURL=sound-play.controller.js.map