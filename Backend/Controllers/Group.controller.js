const { Group } = require('../Models/Group.model');

/**
 * get groups by user
 */
exports._Get = (req, res) => {
    Group.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' } }).then(groups => {
            return res.status(groups !== null ? 200 : 404).send(groups !== null ? groups : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * save new group
 */
exports._Post = (req, res) => {
    new Group(req.body).save().then(group => {
        return res.status(group !== null ? 200 : 404).send(group !== null ? group : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

/**
 * Add member in group
 */
exports._Put = (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$push': { 'Members': { '$each': req.body.Members } } }, { new: true })
        .where('Admin').equals(req.headers._id)
        .populate({
            path: 'Members', populate:
                { path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' }
        }).then(message => {
            return res.status(message !== null ? 200 : 404).send(message !== null ? message : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * delete group
 */
exports._Delete = (req, res) => {
    Group.findByIdAndDelete(req.params.Id).where('Admin').equals(req.headers._id).then(group => {
        return res.status(group !== null ? 200 : 404).send(group !== null ? group : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._DeleteMember = (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$pull': { 'Members': req.body.Member } }).then(message => {
        return res.status(message !== null ? 200 : 404).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}