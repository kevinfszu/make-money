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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoredTokenSchema = exports.MonitoredToken = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const dayjs = require("dayjs");
let MonitoredToken = class MonitoredToken {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MonitoredToken.prototype, "tokenName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], MonitoredToken.prototype, "tokenAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MonitoredToken.prototype, "decimals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MonitoredToken.prototype, "currentPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MonitoredToken.prototype, "lastPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], MonitoredToken.prototype, "errorMsg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MonitoredToken.prototype, "warningLowPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MonitoredToken.prototype, "warningHighPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MonitoredToken.prototype, "warningRange", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'WoopWoop.mp3' }),
    __metadata("design:type", String)
], MonitoredToken.prototype, "warningTone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: dayjs().format('YYYY-MM-DD HH:mm:ss') }),
    __metadata("design:type", String)
], MonitoredToken.prototype, "updateTime", void 0);
MonitoredToken = __decorate([
    (0, mongoose_1.Schema)()
], MonitoredToken);
exports.MonitoredToken = MonitoredToken;
exports.MonitoredTokenSchema = mongoose_1.SchemaFactory.createForClass(MonitoredToken);
//# sourceMappingURL=monitored-token.schema.js.map