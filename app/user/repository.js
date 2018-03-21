const User = require('./model');

const saveUser = (data, saveCb) => {
    const user = new User(data);
    return user.save(saveCb);
};

const editUser = (user, data, saveCb) => {
    user.set(data);
    return user.save(saveCb);
};

const deleteUser = (user) => user.remove();

const findUserByID = (id) => User.findById(id);

const findUserByUsername = (username) => User.findOne({username}).select({token: 0, password: 0, email: 0});

const findUsernamesById = (idArr) => User.where('_id').in(idArr).select('username');

const addEventToUser = (user, eventId, saveCb) => {
    user.subscribed = user.subscribed.concat(eventId);
    return user.save(saveCb);
};

const removeEventFromUser = (user, eventId, saveCb) => {
    user.subscribed = user.subscribed.filter(event => event !== eventId);
    return user.save(saveCb);
};

const selectUserPublicInfo = (user) => ({
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
    findUserByUsername,
    findUsernamesById,
    selectUserPublicInfo,
    addEventToUser,
    removeEventFromUser
};