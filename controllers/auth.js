const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm, woonplaats, birthdate } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
            return res.render('register', {
                message: 'An error occurred'
            });
        }
    
        if(results.length > 0) {
            return res.render('register', {
                message: 'This email is already in use'
            });
        } else if(password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password Didn\'t Match!'
            });
        }


        let hashedPassword = await bcrypt.hash(password, 8);

        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword, birthdate: birthdate, woonplaats: woonplaats}, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                

                return res.render('login', {
                    message: 'User registered!'
                });
            }
        });
    });
};

exports.login = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
            return res.render('login', {
                message: 'An error occurred'
            });
        }
    
        if(results.length === 0) {
            return res.render('login', {
                message: 'Invalid email or password'
            });
        }

        db.query('SELECT * FROM users WHERE name = ?', [name], async (error, results) => {
            if (error) {
                console.log(error);
                return res.render('login', {
                    message: 'An error occurred'
                });
            }
        
            if (results.length === 0) {
                return res.render('login', {
                    message: 'Invalid name or password'
                });
            }

        const user = results[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.render('login', {
                message: 'Invalid email or password'
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);

        return res.render('indexloggedin', {
            message: 'Logged in successfully', name: user.name
        });
    }
    );
    });
}
