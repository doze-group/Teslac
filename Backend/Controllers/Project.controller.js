const { Project } = require('../Models/Project.model');

exports._Get = (req, res) => {
    Project.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' }).then(projects => {
            return res.status(projects !== null ? 200 : 404).send(projects !== null ? projects : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
};

exports._GetId = (req, res) => {
    Project.findById(req.params.Id).where('Members').in([req.headers._id])
        .populate({ path: 'Members', select: '-Password' }).then(projects => {
            return res.status(projects !== null ? 200 : 404).send(projects !== null ? projects : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
};

exports._Post = (req, res) => {
    req.body.Members = req.body.Members != undefined ? [...req.body.Members, req.headers._id] : [req.headers._id];
    new Project(Object.assign({ 'Admin': req.headers._id }, req.body)).save().then(project => {
        return res.status(projects !== null ? 200 : 404).send(project !== null ? project : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
};

exports._Put = (req, res) => {
    Project.findByIdAndUpdate(req.params.Id, req.body)
        .populate({ path: 'Members', select: '-Password -CreateAt -Description -Username -Institutional -Email' }).then(projects => {
            return res.status(projects !== null ? 200 : 404).send(projects !== null ? projects : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
};

exports._PushMessage = (req, res) => {
    Project.findByIdAndUpdate(req.params.Id, { '$push': { 'Messages': Object.assign({ 'User': req.headers._id }, req.body) } },
        { new: true }).where('Members').in([req.headers._id])
        .then(project => {
            return res.status(projects !== null ? 200 : 404).send(project !== null ? project : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._PushTable = (req, res) => {
    Project.findByIdAndUpdate(req.params.Id, { '$push': { 'Tables': req.body } }, { new: true })
        .where('Members').in([req.headers._id])
        .then(project => {
            return res.status(200).send(project !== null ? project : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._DeleteTable = (req, res) => {
    Project.findByIdAndUpdate(req.params.Id, { '$pull': { 'Tables': { '_id': req.params.IdTable } } }, { new: true })
        .where('Members').in([req.headers._id])
        .then(project => {
            return res.status(projects !== null ? 200 : 404).send(project !== null ? project : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._PushTask = (req, res) => {
    Project.findByIdAndUpdate(req.params.Id, { '$push': { 'Tables.$.Tasks': req.body } }, { new: true })
        .where('Members').in([req.headers._id, req.body.Assigned]).where('Tables._id').equals(req.params.IdTable)
        .then(project => {
            return res.status(projects !== null ? 200 : 404).send(project !== null ? project : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._DeleteTask = (req, res) => {
    Project.findByIdAndUpdate(req.params.Id, { '$pull': { 'Tables.$.Tasks': { '_id': req.params.IdTask } } }, { new: true })
        .where('Members').in([req.headers._id]).where('Tables._id').equals(req.params.IdTable)
        .then(project => {
            return res.status(projects !== null ? 200 : 404).send(project !== null ? project : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._Delete = (req, res) => {
    Project.findByIdAndRemove(req.params.Id, req.body).where('Admin').equals(req.headers._id).then(projects => {
        return res.status(projects !== null ? 200 : 404).send(projects !== null ? projects : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
};