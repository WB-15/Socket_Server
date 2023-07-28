const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

app.post("/emit", (req, res) => {
  console.log(req.body);
  let lang = req.body.language;
  io.emit("language", lang);
  res.json({ msg: "Sent emit!" });
});

server.listen(5000, () => {
  console.log("Express Socket.io server listening on port 5000");
});
