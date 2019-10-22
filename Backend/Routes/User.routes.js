const { _Post, _Login } = require('../Controllers/User.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of user model
exports.UserRoutes = Router => {
    Router.post('/user', _Post);
    Router.post('/user/login', _Login);
};