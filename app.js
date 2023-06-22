// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./second-project-readsquad/db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./second-project-readsquad/config")(app);

// default value for title local
const capitalize = require("./second-project-readsquad/utils/capitalize");
const projectName = "second-project-readsquad";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./second-project-readsquad/routes/index.routes");
app.use("/", indexRoutes);

const booksRoutes = require("./second-project-readsquad/routes/books.routes");
app.use("/", booksRoutes);

const userRoutes = require("./second-project-readsquad/routes/user.routes");
app.use("/", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./second-project-readsquad/error-handling")(app);

module.exports = app;
