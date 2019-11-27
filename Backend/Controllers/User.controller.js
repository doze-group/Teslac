const { User } = require('../Models/User.model');
const { CreateToken } = require('../Services/Auth.service');
const { Storage, Cloudinaryv2, Config } = require('../Config/App.config');
const path = require('path');
const CryptoJS = require('crypto-js');

//get all users
exports._Get = (req, res) => {
    User.find().select('-Password -CreateAt -Description -Username -Institutional -Email').where('_id').ne(req.headers._id).then((user) => {
        console.log(user);
        return res.status(user !== null ? 200 : 404).send(user !== null ? user : {});
    }).catch((err) => {
        return res.status(406).send(err);
    });
}

//get user by id
exports._GetId = (req, res) => {
    User.findById(req.headers._id).select('-Password').then(user => {
        return res.status(user !== null ? 200 : 404).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

//search user by name
exports._GetName = (req, res) => {
    User.find({ 'DisplayName': { '$regex': new RegExp(req.params.Name.toUpperCase()) } }).select('-Password -CreateAt -Description -Username -Institutional -Email')
        .where('_id').ne(req.headers._id).then(user => {
            return res.status(user !== null ? 200 : 404).send(user !== null ? user : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

//new user
exports._Post = (req, res) => {
    req.body.Password = CryptoJS.AES.encrypt(req.body.Password, Config.Encrypt);
    new User(req.body).save().then(user => {
        const User = user.toJSON();
        delete User.Password;
        return res.status(user !== null ? 200 : 404).send({
            ...User,
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

//Login
exports._Login = (req, res) => {
    User.findOne().where('Username').equals(req.body.Username).then(user => {
        if (user == null) return res.status(401).send({});
        const password = CryptoJS.AES.decrypt(user.toJSON().Password, Config.Encrypt).toString(CryptoJS.enc.Utf8);
        if (password !== req.body.Password) return res.status(401).send({});
        const User = user.toJSON();
        delete User.Password;
        return res.status(200).send({
            ...User,
            Token: CreateToken(User)
        });
    }).catch(err => {
        console.log(err);
        return res.status(406).send(err);
    });
}

//change image
exports._UploadImage = (req, res) => {
    //validate image with multer
    Storage(req.headers._id)(req, res, err => {
        if (err) return res.status(406).send(err);
        else {
            //upload image in cloudinary
            Cloudinaryv2.uploader.upload(req.file.path, { public_id: path.parse(req.file.filename).name },
                function (err, image) {
                    if (err) return res.status(406).send(err);
                    require('fs').unlinkSync(req.file.path);
                    User.findByIdAndUpdate(req.headers._id, { 'UrlImage': image.secure_url }, { new: true }).then(user => {
                        return res.status(user !== null ? 200 : 404).send(user !== null ? user : {});
                    }).catch(err => {
                        return res.status(406).send(err);
                    });
                });
        }
    });
}