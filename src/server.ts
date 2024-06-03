import { Server } from "http";
import app from "./app";
import config from "./app/config";
import connectDB from "./db";

let server: Server;
connectDB()
  .then(() => {
    server = app.listen(config.port || 8000, () => {
      console.log(`Example app listening on  ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(`mongodb connect failed ${err}`);
  });

process.on("unhandledRejection", () => {
  console.log("unhandledRejection 😡 shuting down the server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException 😡 shuting down the server");

  process.exit(1);
});

