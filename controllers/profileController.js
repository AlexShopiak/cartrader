const path = require('path');

exports.profile = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/profile.html'));
}; 