//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;
const { Message } = require('./Message.model');

const Conversation = new schema({
    Messages: { type: [Message], default: [] },
    Members: { type: [{ type: schema.Types.ObjectId, ref: 'User', required: true }], required: true },
    CreateAt: { type: Date, default: Date.now }
});

exports.Conversation = Moongoose.model('Conversation', Conversation);