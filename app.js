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


const signUpRoutes = require("./routes/signUp.routes");
app.use("/", signUpRoutes);

const authRouter = require('./routes/auth.routes');
app.use('/', authRouter);


const bcrypt = require('bcryptjs');
const saltRounds = 10;

const plainPassword1 = 'HelloWorld';
const plainPassword2 = 'helloworld';

const salt = bcrypt.genSaltSync(saltRounds);

console.log(`Salt => ${salt}`);

const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

const verifyPass1 = bcrypt.compareSync(plainPassword1, hash1);
const verifyPass2 = bcrypt.compareSync('some wrong password', hash2);

console.log(`Hash 1: ${hash1}`);
console.log(`Hash 2: ${hash2}`);
console.log('----------------------------------------');
console.log(`Is plainPassword1 corresponding to the created hash1: ${verifyPass1}`);
console.log(`Is plainPassword2 corresponding to the created hash2: ${verifyPass2}`);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
