const Moongoose = require('mongoose');
const schema = Moongoose.Schema;
const { Message } = require('./Message.model');

const Task = new schema({
    Task: { type: String, required: true },
    Assigned: { type: schema.Types.ObjectId, ref: 'User', required: true },
    CreateAt: { type: Date, default: Date.now }
});

const Tables = new schema({
    Title: { type: String, required: true },
    Tasks: { type: [Task], default: [] },
    CreateAt: { type: Date, default: Date.now }
});

const Project = new schema({
    Messages: { type: [Message], default: [] },
    Tables: { type: [Tables], default: [] },
    Admin: { type: schema.Types.ObjectId, required: true, ref: 'User' },
    Members: { type: [{ type: schema.Types.ObjectId, ref: 'User', required: true }], required: true },
    Title: { type: String, required: true },
    Description: { type: String, default: 'Esto es una descripción del proyecto' },
    CreateAt: { type: Date, default: Date.now }
});

exports.Project = Moongoose.model('Project', Project);