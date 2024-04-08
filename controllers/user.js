const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// controllers/userController.js

// Simuleer een array van gebruikers (dit zou afkomstig kunnen zijn van een database)
let users = [];


// Controllermethode om een gebruiker in te loggen
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    // Zoek naar de gebruiker in de database (hier gesimuleerd met een array)
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send(`Welkom terug, ${username}`);
    } else {
        res.status(401).send('Ongeldige gebruikersnaam of wachtwoord');
    }
};

// Controllermethode om een gebruiker uit te loggen
exports.logoutUser = (req, res) => {
    // Hier zou je normaal gesproken de gebruikerssessie beëindigen
    res.send('Gebruiker succesvol uitgelogd');
};

// Controllermethode om een gebruiker te verwijderen
exports.deleteUser = (req, res) => {
    const { username } = req.body;
    // Zoek en verwijder de gebruiker uit de database (hier gesimuleerd met een array)
    users = users.filter(user => user.username !== username);
    res.send('Gebruiker succesvol verwijderd');
};

// Controllermethode om een gebruiker te bewerken
exports.editUser = (req, res) => {
    const { username, newEmail, newPassword } = req.body;
    // Zoek en bewerk de gebruiker in de database (hier gesimuleerd met een array)
    const user = users.find(user => user.username === username);
    if (user) {
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
        res.send('Gebruiker succesvol bijgewerkt');
    } else {
        res.status(404).send('Gebruiker niet gevonden');
    }
};