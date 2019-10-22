const { User } = require('../Models/User.model');
const { CreateToken } = require('../Services/Auth.service');

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