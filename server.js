const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
// Takes absolute path of URL you want to serve up

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  //   res.send("<h1>Hello Express</h1>");
  res.render("home.hbs", {
    name: "Najib",
    likes: ["Biking", "Cities"],
    welcomeMessage: "Hello everyone",
    pageTitle: "Home Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    error: "Page Not Found."
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "My Projects"
  });
});

// Bind application to a port on the machine. 3000
// common port for developing locally
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
