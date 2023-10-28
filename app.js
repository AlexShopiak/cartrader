const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://alex:0000@sandboxcluster.wh0wned.mongodb.net/?retryWrites=true&w=majority');

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log('Listen on:', port);
    console.log(`http://localhost:${port}/`);
});