"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findById = exports.find = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
let products = require("../../database");
// console.log(products);
function find() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}
exports.find = find;
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);
        resolve(product);
    });
}
exports.findById = findById;
function create(product) {
    return new Promise((resolve, reject) => {
        const data = fs_1.default.readFileSync(__dirname + '/../../database.json', { encoding: 'utf-8' });
        const newProduct = { id: (0, uuid_1.v4)(), ...product };
        products.push(newProduct);
        fs_1.default.writeFileSync(__dirname + '/../../database.json', JSON.stringify(products));
        resolve(newProduct);
    });
}
exports.create = create;
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = { id, ...product };
        (0, utils_1.writeDataToFile)("../../database", products);
        // console.log(products[index]);
        resolve(products[index]);
    });
}
exports.update = update;
function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);
        (0, utils_1.writeDataToFile)("../../database", products);
        resolve("");
    });
}
exports.remove = remove;
