const express = require("express");
const app = express();
//const { PrismaClient } = require("@prisma/client");
//const { bcrypt } = require("bcrypt");
//const jwt = require("jsonwebtoken");

require("dotenv").config();

const authRoute = require("./routers/auth");

//const prisma = new PrismaClient();

//const authRoute = require("./routers/auth");
const postsRoute = require("./routers/posts");
const usersRoute = require("./routers/users");
const cors = require("cors");

//require("dotenv").config();

const PORT = process.env.PORT || 10000;
//const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);

//app.get("/", (req, res) => { res.send("<h1 > Hello!!!</>") });

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));