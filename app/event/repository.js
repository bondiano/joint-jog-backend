const Event = require('./model');

const saveEvent = (data, saveCb) => {
    const event = new Event(data);
    return event.save(saveCb);
};

const editEvent = (event, data, saveCb) => {
    event.set(data);
    return event.save(saveCb);
};

const deleteEvent = (event) => event.remove();

const findEventByID = (id) => Event.findById(id);

const findEventsByID = (idArr) => Event.where('_id').in(idArr);

const findAllEvents = () => Event.find().where('date').gte(new Date());

const addUserToEvent = async (event, user, saveCb) => {
    const _event = await Event.findById(event.id);
    await _event.set('subscribers', event.subscribers.filter(userId => !userId.equals(user.id)).concat(user._id));
    return _event.save(saveCb);
};

const removeUserFromEvent = async (event, user, saveCb) => {
    const _event = await Event.findById(event.id);
    await _event.set('subscribers', event.subscribers.filter(userId => !userId.equals(user.id)));
    await _event.save();
    await Event.find({ subscribers: { $exists: true, $size: 0}}).remove().exec();
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