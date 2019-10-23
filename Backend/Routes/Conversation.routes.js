const { _Get, _Post, _GetOne, _Delete, _Put } = require('../Controllers/Conversation.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of conversation model
exports.ConversationRoutes = Router => {
    Router.get('/conversation', isAuth, _Get);
    Router.get('/conversation/:Id', isAuth, _GetOne);
    Router.post('/conversation', isAuth, _Post);
    Router.put('/conversation/:Id', isAuth, _Put);
    Router.delete('/conversation/:Id', isAuth, _Delete);
}