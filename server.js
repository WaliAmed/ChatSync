const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const connectedUsers = [];

io.on("connection", (socket) => {
  connectedUsers.push({ id: socket.id });

  socket.on("user-info", (user) => {
    for (let i = 0; i < connectedUsers.length; i++) {
      if (connectedUsers[i].id === user.id) {
        connectedUsers[i] = user;
      }
    }
  });

  // Delay the emission of the online-users event
  setTimeout(() => {
    io.emit("online-users", connectedUsers);
  }, 1000); // Adjust the delay as needed

  socket.on("send-message", (message, room, senderId) => {
    socket.to(room).emit("receive-message", message, room, senderId);
  });

  socket.on("disconnect", () => {
    connectedUsers.splice(connectedUsers.indexOf(socket.id), 1);

    // Emit the online-users event to all remaining connected users
    io.emit("online-users", connectedUsers);
  });
});

// port
const port = process.env.PORT || 5000;

// app
const app = express();

app.use(express.json());

// Configure CORS for API routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
