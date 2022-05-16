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
exports.MonitoredTokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const monitored_token_schema_1 = require("../schemas/monitored-token.schema");
let MonitoredTokenService = class MonitoredTokenService {
    constructor(monitoredTokenModel) {
        this.monitoredTokenModel = monitoredTokenModel;
    }
    async create(createMonitoredTokenDto) {
        const createdMonitorToken = new this.monitoredTokenModel(createMonitoredTokenDto);
        return createdMonitorToken.save();
    }
    async findAll() {
        return this.monitoredTokenModel.find().exec();
    }
    async findOne(tokenName) {
        return this.monitoredTokenModel.findOne({ tokenName });
    }
    async update(tokenName, updateMonitoredTokenDto) {
        return this.monitoredTokenModel.updateOne({ tokenName }, { $set: Object.assign({}, updateMonitoredTokenDto) });
    }
    async remove(tokenName) {
        return this.monitoredTokenModel.deleteOne({ tokenName });
    }
};
MonitoredTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(monitored_token_schema_1.MonitoredToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MonitoredTokenService);
exports.MonitoredTokenService = MonitoredTokenService;
//# sourceMappingURL=monitored-token.service.js.map