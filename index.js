import getMembers from "./tele.js";

import express from "express";
const server = express();

server.use(express.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.get("/", (req, res) => {
  res.send("hi");
});

server.post("/", async (req, res) => {
  console.log("Received POST request with data:", req.body);
  const group_ids = req.body.group_ids;
  const members = await getMembers(group_ids[0]);
  console.log(members);
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  res.json({ members });
});
const port = 8000;
server.listen(port, () => {
  console.log(`Example app listening at  ${port}`);
});
