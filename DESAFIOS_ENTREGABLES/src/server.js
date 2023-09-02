import express from "express";
import 

const PORT = 8080;

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log("Server working"));
