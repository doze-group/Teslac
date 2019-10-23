const { User } = require('../Models/User.model');
const { CreateToken } = require('../Services/Auth.service');

//get all users
exports._Get = async (req, res) => {
    User.find().select('-Password -CreateAt -Description').where('_id').ne(req.headers._id).then((user) => {
        return res.status(200).send(user !== null ? user : {});
    }).catch((err) => {
        return res.status(406).send(err);
    });
}

//get user by id
exports._GetId = async (req, res) => {
    User.findById(req.headers._id).then(user => {
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

//search user by name
exports._GetName = async (req, res) => {
    User.find({ 'DisplayName': { '$regex': new RegExp(req.params.Name.toUpperCase()) } }).select('-Password -CreateAt -Description')
        .where('_id').ne(req.headers._id).then(user => {
            return res.status(200).send(user !== null ? user : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

//new user
exports._Post = async (req, res) => {
    new User(req.body).save().then(user => {
        return res.status(200).send({
            User: user.toJSON(),
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

//Login
exports._Login = async (req, res) => {
    User.findOne().where('Username').equals(req.body.Username).where('Password')
        .equals(req.body.Password).then(user => {
            return res.status(200).send({
                User: user.toJSON(),
                Token: CreateToken(user.toJSON())
            });
        }).catch(err => {
            return res.status(406).send(err);
        });
}