import fs from "fs";
import { IncomingMessage } from "http";


interface oj {
  [key : string] : string|number | {[key : string] : number};
}

export function writeDataToFile(filename : string, content : oj) {
  console.log("I'm here");
  
  fs.writeFileSync(filename, JSON.stringify(content, null, " "), 'utf8',)
}




export function getPostData(req: IncomingMessage) :Promise <string>{
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();

      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
