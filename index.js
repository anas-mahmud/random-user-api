const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/user.route");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use(viewCount);

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("random user api is running");
});

app.all("*", (req, res) => {
  res.send("No routes found");
});

// express global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

// global error handler (which error that cannot be handled by express error handler)
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});
