"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const controller_1 = require("./productController/controller");
/*
implement your server code here
*/
const server = http_1.default.createServer(async (req, res) => {
    var _a, _b, _c, _d;
    // implement your server code here
    if (req.url === "/api/products" && req.method === "GET") {
        (0, controller_1.getProducts)(req, res);
    }
    else if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/api\/products\/\w+/)) && req.method === "GET") {
        const id = req.url.split("/")[3];
        (0, controller_1.getProduct)(req, res, id);
    }
    else if (req.url === "/api/products" && req.method === "POST") {
        (0, controller_1.createProduct)(req, res);
    }
    else if (((_b = req.url) === null || _b === void 0 ? void 0 : _b.match(/\/api\/products\/\w+/)) && req.method === "PUT") {
        const id = (_c = req.url) === null || _c === void 0 ? void 0 : _c.split("/")[3];
        (0, controller_1.updateProduct)(req, res, id);
    }
    else if (((_d = req.url) === null || _d === void 0 ? void 0 : _d.match(/\/api\/products\/\w+/)) && req.method === "DELETE") {
        const id = req.url.split("/")[3];
        (0, controller_1.deleteProduct)(req, res, id);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not found" }));
    }
});
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
