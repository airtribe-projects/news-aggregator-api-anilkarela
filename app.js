const express = require('express');
const app = express();
const port = 3000;
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const authRoutes = require("./src/app/auth/auth.routes");
const userPreferences = require("./src/app/user/preferences.route");

dotenv.config();
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user/preferences", userPreferences);


app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => {
    res.send('Hello World!');
});

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri).then(() => {
    console.log(`Connected to MongoDB!!!`);
    app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

})


module.exports = app;