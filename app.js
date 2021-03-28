const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB error ${err.message}`);
});



app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());

const postRoutes = require("./routes/post");

app.use("/", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
