const express = require ('express');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes")


const app = express();

app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        messge: "server is running"
    })
})

app.use("/users", userRoutes);

app.use("/api",apiRoutes)
module.exports =  app;