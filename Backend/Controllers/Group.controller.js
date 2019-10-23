const { Group } = require('../Models/Group.model');

/**
 * get groups by user
 */
exports._Get = async (req, res) => {
    Group.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password -CreateAt -Description' } }).then(groups => {
            return res.status(200).send(groups !== null ? groups : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * save new group
 */
exports._Post = async (req, res) => {
    new Group(req.body).save().then(group => {
        return res.status(200).send(groups !== null ? groups : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

/**
 * Add member in group
 */
exports._Put = async (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$push': { 'Members': { '$each': req.body.Members } } }, { new: true })
        .where('Admin').equals(req.headers._id)
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password -CreateAt -Description' } }).then(message => {
            return res.status(200).send(message !== null ? message : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * delete group
 */
exports._Delete = async (req, res) => {
    Group.findByIdAndDelete(req.params.Id).where('Admin').equals(req.headers._id).then(group => {
        return res.status(200).send(group !== null ? group : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._DeleteMember = async (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$pull': { 'Members': req.body.Member } }).then(message => {
        return res.status(200).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}