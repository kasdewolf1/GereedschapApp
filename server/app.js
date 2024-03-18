const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')

dotenv.config({ path: './env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//zorgt ervoor dat je data van forms kan pakken
app.use(express.urlencoded({ extended: false }));
//zorg ervoor dat data als json komt
app.use(express.json());


app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on Port 5000")
})
