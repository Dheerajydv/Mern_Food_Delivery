"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, data = null, message = "Sucess") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
exports.ApiResponse = ApiResponse;
