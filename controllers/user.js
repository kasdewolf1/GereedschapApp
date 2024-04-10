const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getUserById = (req, res) => {
    const userId = user.userId; // Haal gebruikers-ID op uit sessie of JWT

    // Voer een databasequery uit om gebruikersgegevens op te halen op basis van userId
    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.log('Fout bij het ophalen van gebruikersgegevens:', error);
            return res.status(500).send('Er is een fout opgetreden bij het ophalen van gebruikersgegevens.');
        }

        if (results.length === 0) {
            return res.status(404).send('Gebruiker niet gevonden.');
        }

        const user = results[0];
        res.json(user); // Stuur gebruikersgegevens terug naar de client als JSON
    });
};
