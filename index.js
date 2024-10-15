import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

env.config();

const app = express();
const port = process.env.PORT || 3000;

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

// set the public files directory
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.static("public"));*/

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));


let currentUserId = 1;

let users = [];
//{id: 1, name: "Angela", color: "teal"}

async function checkVisited() {
    const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1;", [currentUserId]);

    let countries = [];
    result.rows.forEach((country) => {
        countries.push(country.country_code);
    });

    //console.log(countries);

    return countries;
}

async function getCurrentUser() {
    const result = await db.query("SELECT * FROM users");
    users = result.rows;
    const usersOut = users.find((user) => user.id == currentUserId);
    //console.log(usersOut);

    return usersOut;
}

app.get("/", async (req, res) => {
    const countries = await checkVisited();
    const currentUser = await getCurrentUser();
    const showAlert = req.query.success === 'true'
    res.render("index.ejs", { countries: countries, total: countries.length, users: users, color: currentUser.color, showAlerts: showAlert, selectedUserId: currentUserId });
});

app.post("/add", async (req, res) => {
    const input = req.body["country"];
    const currentUser = await getCurrentUser();

    if (input) {

        try {

            const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [input.toLowerCase()]);
            const data = result.rows[0];
            const countryCode = data.country_code;
            const countries = await checkVisited();
            const contains = countries.includes(countryCode);

            try {

                if (contains) {
                    const showAlert = false;
                    res.render("index.ejs", { countries: countries, total: countries.length, error: "Country Name Already Added", users: users, color: currentUser.color, showAlerts: showAlert, selectedUserId: currentUserId });
                }

                else {
                    await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)", [countryCode, currentUserId]);
                    res.redirect("/?success=true");
                }

            }

            catch (err) {
                console.log(err);
            }

        }

        catch (err) {
            console.log(err);
            const countries = await checkVisited();
            const showAlert = false;
            res.render("index.ejs", { countries: countries, total: countries.length, error: "Country Name Not Found", users: users, color: currentUser.color, showAlerts: showAlert, selectedUserId: currentUserId });
        }

    }

});

app.post("/users", async (req, res) => {
    if (req.body.add === "new") {
        res.render("new.ejs");
    }

    else {
        currentUserId = req.body.user;
        res.redirect("/");
    }
});

app.post("/new", async (req, res) => {
    const nameEntry = req.body.name;
    const name = nameEntry.charAt(0).toUpperCase() + nameEntry.slice(1).toLowerCase();
    const color = req.body.color;
    const result = await db.query("SELECT name FROM users Where name = $1", [name]);

    try {

        if (result.rows.length === 1) {
            res.render("new.ejs", { exist: "UserName Already Exist" });
        }

        else {
            const result = await db.query("INSERT INTO users(name, color) VALUES($1, $2) RETURNING *;", [name, color]);
            const id = result.rows[0].id;
            currentUserId = id;

            res.redirect("/");
        }

    }

    catch (err) {
        console.log(err);
        res.render("new.ejs", { error: "Character limit Exceeds by 25" });
    }

});

app.get("/country", (req, res) => {
    res.render("country.ejs");
});

app.get("*", (req, res) => {
    res.render("error.ejs", { title: "404 - Page Not Found" });
});

app.listen(port, () => {
    console.log(`Server Started in port ${port}`);
});