const { _Get, _Post, _Put, _Delete, _DeleteMember } = require('../Controllers/Group.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of grou`p model
exports.GroupRoutes = Router => {
    Router.get('/Group', isAuth, _Get);
    Router.post('/Group', isAuth, _Post);
    Router.put('/Group/:Id', isAuth, _Put);
    Router.delete('/Group/:Id', isAuth, _Delete);
    Router.delete('/Group/Member/:Id', isAuth, _DeleteMember);
}