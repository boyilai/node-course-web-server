const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}:${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log, err => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render("maintenance.hbs");
});

app.get("/", (req, res) => {
    // res.send("Hello World!");
    res.render("home.hbs", {
        pageTitle: "Home",
        welcome: "Hi, there."
    });
});

app.get("/about", (req, res) => {
    // res.send("about me");
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to handle request!"
    });
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}.`);
});
