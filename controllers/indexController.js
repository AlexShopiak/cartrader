const path = require('path');

exports.index = (req, res) => {
    //res.send('Main page.TODO');
    res.sendFile(path.join(__dirname, '../views/index.html'));
}; 