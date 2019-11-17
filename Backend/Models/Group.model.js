//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;
const { Message } = require('./Message.model');

const Group = new schema({
    DisplayName: { type: String, required: true },
    UrlImage: { type: String, default: 'https://image.flaticon.com/icons/svg/1256/1256661.svg' },
    Messages: { type: [Message], default: [] },
    Admin: { type: schema.Types.ObjectId, ref: 'User', required: true },
    CreateAt: { type: Date, default: Date.now },
    Members: { type: [{ type: schema.Types.ObjectId, ref: 'User', required: true }], required: true },
});

//Export model
exports.Group = Moongoose.model('Group', Group);