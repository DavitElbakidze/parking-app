"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.getSuccessMessage = void 0;
const response_type_enum_1 = require("./response-type.enum");
function getSuccessMessage(data, message) {
    return {
        status: response_type_enum_1.ResponseType.success,
        data,
        message,
    };
}
exports.getSuccessMessage = getSuccessMessage;
function getErrorMessage(message) {
    return {
        status: response_type_enum_1.ResponseType.error,
        error: message,
    };
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=response-functions.utils.js.map