/**
 * Schema moongose User
 */
//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

//define schemaS
const UserSchema = new schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    DisplayName: { type: String, required: true },
    Email: { type: String, required: true },
    Institutional: { type: String, required: true, unique: true },
    Role: {
        type: String, required: true, validate: {
            validator: function (role) {
                return role === 'Estudiante' || role === 'Administrativo' || role === 'Docente'
            },
            message: 'role invalid'
        }
    },
    UrlImage: { type: String, default: 'https://image.flaticon.com/icons/svg/660/660611.svg' },
    Description: { type: String, default: 'Cuenta una pequeña descripción' },
    CreateAt: { type: Date, default: Date.now }
});

//Export model
exports.User = Moongoose.model('User', UserSchema);