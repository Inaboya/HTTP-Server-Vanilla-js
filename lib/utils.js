"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostData = exports.writeDataToFile = void 0;
const fs_1 = __importDefault(require("fs"));
function writeDataToFile(filename, content) {
    console.log("I'm here");
    fs_1.default.writeFileSync(filename, JSON.stringify(content, null, " "), 'utf8');
}
exports.writeDataToFile = writeDataToFile;
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getPostData = getPostData;
