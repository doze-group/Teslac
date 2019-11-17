const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

const Message = new schema({
    Message: { type: String, required: true },
    User: { type: schema.Types.ObjectId, ref: 'User', required: true },
    CreateAt: { type: Date, default: Date.now },
});

exports.Message = Message;