"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoredTokenModule = void 0;
const common_1 = require("@nestjs/common");
const monitored_token_service_1 = require("./monitored-token.service");
const monitored_token_controller_1 = require("./monitored-token.controller");
const mongoose_1 = require("@nestjs/mongoose");
const monitored_token_schema_1 = require("../schemas/monitored-token.schema");
let MonitoredTokenModule = class MonitoredTokenModule {
};
MonitoredTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: monitored_token_schema_1.MonitoredToken.name, schema: monitored_token_schema_1.MonitoredTokenSchema }])],
        controllers: [monitored_token_controller_1.MonitoredTokenController],
        providers: [monitored_token_service_1.MonitoredTokenService],
        exports: [monitored_token_service_1.MonitoredTokenService]
    })
], MonitoredTokenModule);
exports.MonitoredTokenModule = MonitoredTokenModule;
//# sourceMappingURL=monitored-token.module.js.map