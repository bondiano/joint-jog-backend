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
    return repository.findEventByID(eventId).then((event) => {
        if (!event) {
            return res.notFound();
        }
        userRepository.findUsernamesById(event.subscribers)
        .then(usernames => {
            return res.success({event, usernames});
        });
    }).catch((err) => {
        return res.unprocessableEntity(err);
    });
};

exports.edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    return repository.findEventByID(id)
    .then((event) => {
        if (!event) {
            return res.notFound();
        }
        return repository.editEvent(event, data, (err) => {
            if (err) {
                return res.validationError(err);
            }
            return res.success({message: 'Successful edit event'});
        });
    }).catch((err) => {
        return res.unprocessableEntity(err);
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
        await userRepository.removeEventFromUser(user, currentEvent._id);
        await repository.removeUserFromEvent(currentEvent, user);
        return res.success({message: 'Successful unsubscribe'});
    } catch(err) {
        return res.unprocessableEntity(err);        
    }
};