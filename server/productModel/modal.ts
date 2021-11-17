import fs from 'fs'
import { v4 as uuidv4 } from "uuid";
import { writeDataToFile }  from "../utils";

let products = require("../../database");
// console.log(products);

export function find() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

export function findById(id : string) {
  return new Promise((resolve, reject) => {
    const product = products.find((product : any) => product.id === id);
    resolve(product);
  });
}

export function create(product : object) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(__dirname + '/../../database.json', { encoding: 'utf-8' });
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);

    fs.writeFileSync(__dirname + '/../../database.json', JSON.stringify(products));
    resolve(newProduct);
  });
}

export function update(id : string, product : object) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p : any) => p.id === id)
        products[index] = {id, ...product}

        writeDataToFile("../../database", products);

        // console.log(products[index]);
        
        resolve(products[index])
    })
}


export function remove(id : string) {
    return new Promise((resolve, reject) => {
        products = products.filter((p : any) => p.id !== id)
        writeDataToFile("../../database", products);
        resolve("")
    })
}

