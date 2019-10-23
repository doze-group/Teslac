const { _Get, _Post, _GetOne, _Delete, _Put } = require('../Controllers/Conversation.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of conversation model
exports.ConversationRoutes = Router => {
    Router.get('/Conversation', isAuth, _Get);
    Router.get('/Conversation/:Id', isAuth, _GetOne);
    Router.post('/Conversation', isAuth, _Post);
    Router.put('/Conversation/:Id', isAuth, _Put);
    Router.delete('/Conversation/:Id', isAuth, _Delete);
}