const path = require('path');

exports.main = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/main.html'));
}; 