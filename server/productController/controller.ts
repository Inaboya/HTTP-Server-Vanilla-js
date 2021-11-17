import { IncomingMessage, ServerResponse } from "http";

const Products = require("../productModel/modal");
import { getPostData } from "../utils";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000, // 30 days
  "Content-type": "application/json",
  /** add other headers as per requirement */
};

interface Bodys {
    produnctName: string;
    productDescription?: string;
    productVarieties ?: [
        {[key: string]: string}
    ],
    dateUploaded?: string;
    dateEdited?: string;
}

//@DESC GET all products
//@Route /api/products

export async function getProducts(req: IncomingMessage, res: ServerResponse) {
  try {
    const products = await Products.find();
    res.writeHead(200, headers);
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

//@DESC GET single products
//@Route /api/products
export async function getProduct(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const product: any = await Products.findById(id);
    if (!product) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: "product doesn't exist" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

//@DESC Create a product
//@Route /api/products
export async function createProduct(req: IncomingMessage, res: ServerResponse) {
  try {
    
      
    let body : any = await getPostData(req);
    // console.log(typeof body);
    body  = JSON.parse(body)
    // console.log(typeof body)

    
    

    const {
      productName,
      productDescription,
      productVarieties: [{ size, color, quantity, image, price }],
      dateUpload,
    } = body; 
    

    const product: any = {
      productName,
      productDescription,
      productVarieties: [
        {
          size,
          color,
          quantity,
          image,
          price,
        },
      ],

      dateUpload: new Date().toISOString(),
    };
 
    const newProduct = await Products.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @DESC Update a product
// @Route PUT /api/products/:id

export async function updateProduct(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const product: any = await Products.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product doesn't exist" }));
    } else {
      let body: any = await getPostData(req);  
      body = JSON.parse(body)
    //   console.log(typeof body);
          

      const {
        productName,
        productDescription,
        productVarieties,
        dateUpload,
      } = body;

      
      const productData: any = {
        productName: productName || product.productName,
        productDescription: productDescription || product.productDescription,
        productVarieties: productVarieties || product.productVarieties,
        dateEdited: new Date().toISOString() 
      };
      const updatedProduct = await Products.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

//@DESC DELETE single products
//@Route delete /api/products/:id
export async function deleteProduct(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product doesn't exist" }));
    } else {
      await Products.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `Product with the ${id} has been deleted` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
