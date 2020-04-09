const express = require("express");

const server = express();

const postRouter = require("./postrouter.js");

server.use(express.json());

server.use("/api/posts", postRouter);


server.get("/", (req, res) => {
    res.status(201).json({ message : "Its working (Dustin Meyers voice)"})
})

server.listen(5000, () => {
    console.log("listening on port 4000")
})