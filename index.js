import getMembers from "./tele.js";
import express from "express";
// getMembers(`-1001161574933`);

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
  res.send("hi");
});
server.post("/", (req, res) => {
  const group_ids = req.body.group_ids;

  console.log("Received POST request with data:", requestData);

  res.json(group_ids);
});
const port = 80;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
