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
exports.MonitoredTokenController = void 0;
const common_1 = require("@nestjs/common");
const monitored_token_service_1 = require("./monitored-token.service");
const create_monitored_token_dto_1 = require("./dto/create-monitored-token.dto");
const update_monitored_token_dto_1 = require("./dto/update-monitored-token.dto");
let MonitoredTokenController = class MonitoredTokenController {
    constructor(monitoredTokenService) {
        this.monitoredTokenService = monitoredTokenService;
    }
    async create(createMonitoredTokenDto) {
        const monitoredToken = await this.monitoredTokenService.findOne(createMonitoredTokenDto.tokenName);
        if (monitoredToken !== null) {
            throw new common_1.BadRequestException('该币种已处于受监控状态，请勿重复监控');
        }
        if (createMonitoredTokenDto.warningLowPrice * 1 > createMonitoredTokenDto.warningHighPrice * 1) {
            throw new common_1.BadRequestException('预警币价下限不能大于预警币价上限');
        }
        return this.monitoredTokenService.create(createMonitoredTokenDto);
    }
    findAll() {
        return this.monitoredTokenService.findAll();
    }
    findOne(tokenName) {
        return this.monitoredTokenService.findOne(tokenName);
    }
    update(tokenName, updateMonitoredTokenDto) {
        if (updateMonitoredTokenDto.warningLowPrice * 1 > updateMonitoredTokenDto.warningHighPrice * 1) {
            throw new common_1.BadRequestException('预警币价下限不能大于预警币价上限');
        }
        return this.monitoredTokenService.update(tokenName, updateMonitoredTokenDto);
    }
    remove(tokenName) {
        return this.monitoredTokenService.remove(tokenName);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_monitored_token_dto_1.CreateMonitoredTokenDto]),
    __metadata("design:returntype", Promise)
], MonitoredTokenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MonitoredTokenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':tokenName'),
    __param(0, (0, common_1.Param)('tokenName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoredTokenController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':tokenName'),
    __param(0, (0, common_1.Param)('tokenName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_monitored_token_dto_1.UpdateMonitoredTokenDto]),
    __metadata("design:returntype", void 0)
], MonitoredTokenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':tokenName'),
    __param(0, (0, common_1.Param)('tokenName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoredTokenController.prototype, "remove", null);
MonitoredTokenController = __decorate([
    (0, common_1.Controller)('monitored-token'),
    __metadata("design:paramtypes", [monitored_token_service_1.MonitoredTokenService])
], MonitoredTokenController);
exports.MonitoredTokenController = MonitoredTokenController;
//# sourceMappingURL=monitored-token.controller.js.map