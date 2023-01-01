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

server.use((req, res, next) => {
  // console.log("<__body logger start____>");
  // console.log(req.body);
  // console.log("<_____body logger end____>");

  next();
});

server.get("/background/:color", (req, res, next) => {
  res.send(`
    <body style="background: ${req.params.color};">
      <h1>Hello World</h1>
    </body>
  `);
});

server.get("/add/:first/to/:second", (req, res, next) => {
  res.send(
    `<h1>${req.params.first} + ${req.params.second} = ${
      Number(req.params.first) + Number(req.params.second)
    }</h1>`
  );
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
