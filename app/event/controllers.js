const repository = require('./repository');
const userRepository = require('../user/repository');

/**
 * Request json example:
 * {
        points: [{x:0.1, y:58.1}],
        titie: 'My first jog',
        describe: 'bla bla bla',
        data: timestamp
 * }
 */
exports.create = (req, res) => {
    const data = req.body;
    const owner = req.user;

    if(!owner) {
        return res.validationError({
            errors: [{
                path: 'owner',
                message: 'Event needs owner'
            }]
        });
    }

    if(!data.date) {
        return res.validationError({
            errors: [{
                path: 'date',
                message: 'Event needs date'
            }]
        });
    }

    data.owner = owner.username;
    data.subscribers = [owner._id];

    repository.saveEvent(data, (err, data) => {
        if (err) {
            return res.validationError(err);
        }
        userRepository.addEventToUser(owner, data.id, (err) => {
            if (err) {
                return res.unprocessableEntity(err);
            }
            return res.success({message: 'Successful created new event'});
        });
    });
};

exports.getAll = (req, res) => {
    return repository.findAllEvents().then((data) => {
        return res.success(data);
    }).catch((err) => {
        return res.unprocessableEntity(err);
    });
};

exports.getOne = (req, res) => {
    const eventId = req.params.id;
    return repository.findEventByID(eventId).then((data) => {
        if (!data) {
            return res.notFound();
        }
        return res.success(data);
    }).catch((err) => {
        return res.unprocessableEntity(err);
    });
};

exports.edit = async (req, res) => {
    const data = req.body;
    const { id } = data;
    const currentEvent = await repository.findEventByID(id);  
    return repository.editEvent(currentEvent, data, (err) => {
        if (err) {
            return res.validationError(err);
        }
        return res.success({message: 'Successful edit event'});
    });
};

/**
 * Request json example:
 * {
        id: String
 * }
 */
exports.subscribe = async (req, res) => {
    const { user }  = req;
    const { id } = req.body;
    try {
        const currentEvent = await repository.findEventByID(id);
        await repository.addUserToEvent(currentEvent, user);
        await userRepository.addEventToUser(user, currentEvent._id);
        return res.success({message: 'Successful subscribe'});
    } catch(err) {
        return res.unprocessableEntity(err);        
    }
};

/**
 * Request json example:
 * {
        id: String
 * }
 */
exports.unsubscribe = async (req, res) => {
    const { user }  = req;
    const { id } = req.body;
    try {
        const currentEvent = await repository.findEventByID(id);
        await repository.removeUserFromEvent(currentEvent, user);
        await userRepository.removeEventFromUser(user, currentEvent._id);
        return res.success({message: 'Successful subscribe'});
    } catch(err) {
        return res.unprocessableEntity(err);        
    }
};