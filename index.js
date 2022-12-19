const PORT = 3000;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
const { client } = require("./db");

client.connect();

// middleware

server.use(morgan("dev"));

server.use(express.json());

server.use("/api", apiRouter);

// server.get("/", (req, res) => {
//   const data = db.list();
// });

server.use((req, res, next) => {
  console.log("<__body logger start____>");
  console.log(req.body);
  console.log("<_____body logger end____>");

  next();
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
