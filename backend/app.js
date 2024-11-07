const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');

// Configurazione EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const name = req.cookies.name; // Legge il cookie "name"
    if (name) {
        // Se il cookie esiste, mostra la pagina di saluto
        res.cookie('name', name, { maxAge: 24 * 60 * 60 * 1000 }); 
        res.render('greet', { message:'Benvenuto', name: name });
    } else {
        // Se non esiste, mostra il form
        res.render('form');
    }
});

app.post('/greet', (req, res) => {
    const name = req.body.name;
    res.cookie('name', name, { maxAge: 24 * 60 * 60 * 1000 }); 
    res.render('greet', { message: 'Benvenuto', name: name });
});

app.get('/logout', (req, res) => {
    res.clearCookie('name'); // Cancella il cookie chiamato "name"
    res.redirect('/');       // Reindirizza alla home page
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});