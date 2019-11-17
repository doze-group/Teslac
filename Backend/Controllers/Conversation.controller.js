/**
 * File Controller Conversatios
 */
const { Conversation } = require('../Models/Conversation.model');

/**
 * get conversations from a user
 */
exports._Get = (req, res) => {
    Conversation.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' })
        .then(conversation => {
            return res.status(conversation !== null ? 200 : 404).send(conversation !== null ? conversation : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * get one conversation by users
 */
exports._GetOne = (req, res) => {
    Conversation.findOne().where('Members').all([req.headers._id, req.params.Id])
        .populate({ path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' }).then(conversation => {
            return res.status(conversation !== null ? 200 : 404).send(conversation !== null ? conversation : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * save a conversations
 */
exports._Post = (req, res) => {
    new Conversation(req.body).save().then(conversation => {
        conversation.populate({ path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' }, function (err) {
            return res.status(conversation !== null ? 200 : 404).send(conversation !== null ? conversation : {});
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

/**
 * Add message in conversations
 */
exports._Put = (req, res) => {
    Conversation.findByIdAndUpdate(req.params.Id, { '$push': { 'Messages': req.body } }, { new: true })
    .then(conversation => {
        return res.status(conversation !== null ? 200 : 404).send(conversation !== null ? conversation : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

/**
 * delete conversation
 */
exports._Delete = (req, res) => {
    Conversation.findByIdAndDelete(req.params.Id).then(conversation => {
        return res.status(conversation !== null ? 200 : 404).send(conversation !== null ? conversation : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}