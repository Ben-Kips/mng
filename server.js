const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
connectDb();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React front-end URL
  credentials: false, // Allow credentials (cookies, HTTP authentication, etc.)
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/client", require("./routes/clientRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
