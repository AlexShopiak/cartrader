const path = require('path');

exports.main = (req, res) => {
    //res.send('Main page.TODO');
    res.sendFile(path.join(__dirname, '../views/main.html'));
}; 