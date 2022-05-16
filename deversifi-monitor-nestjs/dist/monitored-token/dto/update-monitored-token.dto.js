"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMonitoredTokenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_monitored_token_dto_1 = require("./create-monitored-token.dto");
class UpdateMonitoredTokenDto extends (0, mapped_types_1.PartialType)(create_monitored_token_dto_1.CreateMonitoredTokenDto) {
}
exports.UpdateMonitoredTokenDto = UpdateMonitoredTokenDto;
//# sourceMappingURL=update-monitored-token.dto.js.map