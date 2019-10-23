//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

const Messages = new schema({
    Message: { type: String, required: true },
    User: { type: schema.Types.ObjectId, ref: 'User', required: true },
    CreateAt: { type: Date, default: Date.now },
});

const Conversation = new schema({
    Messages: { type: [Messages], default: [] },
    Members: { type: [{ type: schema.Types.ObjectId, ref: 'User', required: true }], required: true },
    CreateAt: { type: Date, default: Date.now }
});

exports.Conversation = Moongoose.model('Conversation', Conversation);