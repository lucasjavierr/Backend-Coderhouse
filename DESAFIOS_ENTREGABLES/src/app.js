import express from "express";
import { ProductManagerFiles } from "./persistence/ProductManagerFiles.js";
import { ProductManagerMemory } from "./persistence/ProductManagerMemory.js";

const managerProductService = new ProductManagerFiles("./files/products.json");

const PORT = 8080;

const app = express();

app.listen(PORT, () => console.log("Server working"));

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await managerProductService.getProducts();
    if (limit) {
      const productsLimit = products.slice(0, limit);
      res.send(productsLimit);
    } else {
      res.send(products);
    }
  } catch (error) {
    res.send(error.message);
  }
});
