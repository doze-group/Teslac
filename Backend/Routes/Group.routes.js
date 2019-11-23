const { _Get, _GetId, _Post, _Put, _Delete, _DeleteMember, _PushMessage } = require('../Controllers/Group.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of grou`p model
exports.GroupRoutes = Router => {
    Router.get('/group', isAuth, _Get);
    Router.get('/group/:Id', isAuth, _GetId);
    Router.post('/group', isAuth, _Post);
    Router.put('/group/:Id', isAuth, _Put);
    Router.put('/group/message/:Id', isAuth, _PushMessage);
    Router.delete('/group/:Id', isAuth, _Delete);
    Router.delete('/group/member/:Id', isAuth, _DeleteMember);
}