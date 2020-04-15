// Import global module
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
const http = require("http");
require("dotenv").config();

// Set App
const app = express();

// Set Server
const server = http.createServer(app);

// Set cors
// const corsOptions = {
//   origin: "https://unpar-ekantin.firebaseapp.com/",
//   optionsSuccessStatus: 200,
// };

app.use(cors());

// Parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application / json
app.use(bodyParser.json());

// Set Token
app.use(bearerToken());

// Set Static File
app.use(express.static("public"));

// Check database connection
const db = require("./database/db");
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

// Set routes
const { adminRoutes, publicRoutes } = require("./routes");
app.get("/", (req, res) => res.status(200).send("Server e-kantin Unpar is running..."));
app.use("/admin", adminRoutes);
app.use("/public", publicRoutes);

// Set PORT
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
