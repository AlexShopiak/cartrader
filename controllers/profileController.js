//const User = require('../models/User');
const path = require('path');
  
exports.getAllProfiles = async (req, res) => {
    /*try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении данных');
    }*/
    //res.send('Profiles. TODO');
    res.sendFile(path.join(__dirname, '../views/profile.html'));
};

exports.getProfileById = async (req, res) => {
    /*try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send('Пользователь не найден');
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении данных');
    }*/
    //res.send('Profiles. TODO');
    res.sendFile(path.join(__dirname, '../views/profile.html'));
};
  