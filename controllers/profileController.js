const Product = require('../models/Product');

exports.profile = async (req, res) => {
    if (req.session.user) {
        const name = req.query.name;
        const sort = req.query.sort;
        const prev = { name: name, sort: sort };
  
        try {
            const itemsCounter = await Product.countDocuments({ owner: req.session.user.name });
    
            const data = {
                name: req.session.user.name,
                items: itemsCounter,
                prev: prev,
            };
    
            if (products.length == 0) {
                data.message = "No results";
            } else {
                const params = getParams(req.session.user.name, name);
                const products = await Product.find(params);
                data.products = sortProducts(sort, products);
            }
    
            res.render('profile/profile_user', data);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
      res.redirect('/auth/login');
    }
};
  

exports.createItem = async (req, res) => {
    if (req.session.user) {
        try {
            await Product.create({
                name: req.body.name,
                description: req.body.description,
                owner: req.session.user.name,
                price: req.body.price,
            });
            res.redirect('/profile')
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/auth/login')
    }
};

exports.deleteItem = async (req, res) => {
    res.redirect('/auth/login'); //todo
};

const getParams = (owner, name) => {
    if (name) {
        return { owner: owner, name:name };
    } else {
        return { owner: owner };
    } 
}

const sortProducts = (type, products) => {
    const copy = products.slice();
    if (type == 'fromcheap') {
        copy.sort((a, b) => a.price - b.price);
    } else if (type == 'tocheap') {
        copy.sort((a, b) => b.price - a.price);
    }
    return copy;
}