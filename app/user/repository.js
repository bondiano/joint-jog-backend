const User = require('./model');

const saveUser = (data, saveCb) => {
    const user = new User(data);
    return user.save(saveCb);
};

const editUser = (user, data, saveCb) => {
    const currentUser = user;
    // TODO: Make edit user by request parameters
    return user.save(saveCb);
};

const deleteUser = (user) => user.remove();

const findUserByID = (id) => User.findById(id);

const findUserByUsername = (username) => User.findOne({username});

const getUserPublicInfo = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    subscribed: user.subscribed,
    social_network: user.socialNetwork,
    first_name: user.firstName,
    last_name: user.lastName,
    age: user.age,
    sex: user.sex
});

module.exports = {
    saveUser,
    editUser,
    deleteUser,
    findUserByID,
    findUserByUsername
};