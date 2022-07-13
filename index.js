const express = require("express");
const connection = require("./database");
const cors = require("cors");
require("dotenv").config();

//Routes
const authRouter = require("./Routes/authapp.routes");
const taskRouter = require("./Routes/taskapp.routes");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRouter);
app.use("/user", taskRouter);

app.get("/", (req, res) => {
    res.send("Homepage")
})

const port = process.env.PORT || 8080

app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to DB successfully");
    }
    catch {
        console.log("Failed to connect DB")
    }
    console.log(`Server running on localhost:${port}`)
})


