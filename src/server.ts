import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";
import pino from "pino";
import { join, resolve } from "path";
import {
  formatMessage,
  generateLocation,
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave,
} from "./utils";

dotenv.config();
const logger = pino();
const app: express.Application = express();
const httpServer = createServer(app);

const botName = "SocketChat Bot";
const serverPort = process.env.PORT || 3000;

const io = new Server(httpServer, {
  cors: {
    origin: "*", // change this to localhost or any suitable URL
  },
});

app.use("/", express.static(join(__dirname, "/public")));
// app.use("/joinPath1", express.static(join(__dirname, "../public")));
// app.use("/joinPath2", express.static(join(__dirname, "./public")));
// app.use("/joinPath3", express.static(join(__dirname, "public")));
// app.use("/resolvePath1", express.static(resolve(__dirname, "/public")));
// app.use("/resolvePath2", express.static(resolve(__dirname, "../public")));
// app.use("/resolvePath3", express.static(resolve(__dirname, "./public")));
// app.use("/resolvePath4", express.static(resolve(__dirname, "public")));

// initialize redis connection
const pubClient = new Redis(process.env.REDIS_URL);
const subClient = pubClient.duplicate();

pubClient.on("error", (error) => {
  logger.error(error);
});

subClient.on("error", (error) => {
  logger.error(error);
});

io.adapter(createAdapter(pubClient, subClient));

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to SocketChat!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", formatMessage(user.username, message));
    }
  });

  // Listen for geolocation
  socket.on(
    "sendLocationInfo",
    (coords: { username: string; lat: number; lon: number }) => {
      const user = getCurrentUser(socket.id);

      if (user) {
        io.to(user.room).emit(
          "sendLocationMessage",
          generateLocation(user.username, coords)
        );
      }
    }
  );

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});



// basic public try
// app.get("/basicPublic", (req, res) => {
//   logger.info(req);
//  logger.info(__dirname,"dirname");
//  logger.info(process.cwd(), "current working directory");
//  res.sendFile(resolve(__dirname, "index.html"));
// });


// 404 route
app.get("*", (req, res) => {
  res.status(404).send("Unable to find the requested resource");
});

httpServer.listen(serverPort, () => {
  logger.info(`Server listening on port ${serverPort}`);
});
