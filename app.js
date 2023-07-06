// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs


const hbs = require("hbs");

hbs.registerPartials("partials_absolute_path");

const path = require('path');
hbs.registerPartials(path.join(__dirname, 'views/partials/'));


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "second-project-readsquad";

app.set('view engine','hbs');

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const booksRoutes = require("./routes/books.routes");
app.use("/", booksRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);





require("./error-handling")(app);

module.exports = app;
