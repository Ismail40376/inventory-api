const express = require("express");
const app = express();
const port = 8000;
const categories = require("./app/categories");
const fileCategoriesDb = require("./fileCategoriesDb");

async function start() {
  app.use(express.json());
  app.use(express.static("public"));
  await fileCategoriesDb.init();
  app.use("/categories", categories);

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}

start();
