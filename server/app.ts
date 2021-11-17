import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from  "./productController/controller";

/*
implement your server code here
*/


const server :Server = http.createServer( async (req: IncomingMessage, res: ServerResponse) => {

    // implement your server code here
    if (req.url === "/api/products" && req.method === "GET") {
      getProducts(req, res);
    } else if (req.url?.match(/\/api\/products\/\w+/) && req.method === "GET") {
          const id  = req.url.split("/")[3];
          getProduct(req, res, id);
    } else if (req.url === "/api/products" && req.method === "POST"){
      createProduct(req, res);
    } else if (req.url?.match(/\/api\/products\/\w+/) && req.method === "PUT"){
      const id  = req.url?.split("/")[3];
      updateProduct(req, res, id);
    } else if (req.url?.match(/\/api\/products\/\w+/) && req.method === "DELETE"){
      const id = req.url.split("/")[3];
      deleteProduct(req, res, id);
    }else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not found" }));
    }
  }
)

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
