const { _Post, _Login, _Get, _GetId, _GetName } = require('../Controllers/User.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of user model
exports.UserRoutes = Router => {
    Router.get('/user', isAuth, _Get);
    Router.get('/user/id', isAuth, _GetId);
    Router.get('/user/:Name', _GetName);
    Router.post('/user', _Post);
    Router.post('/user/login', _Login);
};