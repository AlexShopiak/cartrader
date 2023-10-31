const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb+srv://alex:0000@sandboxcluster.wh0wned.mongodb.net/?retryWrites=true&w=majority');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
    secret: '0000',
    resave: false,
    saveUninitialized: true,
}));

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/main', mainRoutes);
app.use('/products', productsRoutes);
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Listen on:', port);
    console.log(`http://localhost:${port}/main`);
});