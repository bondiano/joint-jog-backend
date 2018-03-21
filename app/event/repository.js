const Event = require('./model');

const saveEvent = (data, saveCb) => {
    const event = new Event(data);
    return event.save(saveCb);
};

const editEvent = async (event, data, saveCb) => {
    event.set(data);
    return event.save(saveCb);
};

const deleteEvent = (event) => event.remove();

const findEventByID = (id) => Event.findById(id);

const findEventsByID = (idArr) => Event.where('_id').in(idArr);

const findAllEvents = () => Event.find();

const addUserToEvent = (event, user, saveCb) => {
    event.subscribers = event.subscribers.concat(user._id);
    return event.save(saveCb);
};

const removeUserFromEvent = (event, user, saveCb) => {   
    event.subscribers = event.subscribers.filter(userId => userId !== user._id);
    return event.save(saveCb);
};

module.exports = {
    saveEvent,
    editEvent,
    deleteEvent,
    findEventByID,
    findEventsByID,
    findAllEvents,
    addUserToEvent,
    removeUserFromEvent
};