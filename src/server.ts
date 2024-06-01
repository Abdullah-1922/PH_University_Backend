import app from "./app";
import config from "./app/config";
import connectDB from "./db";

connectDB()
  .then(() => {
    app.listen(config.port || 8000, () => {
      console.log(`Example app listening on  ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(`mongodb connect failed ${err}`);
  });
