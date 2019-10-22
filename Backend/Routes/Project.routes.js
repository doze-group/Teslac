const { _Post, _Get, _Delete, _GetId, _Put, _PushMessage, _PushTable, _DeleteTable, _PushTask, _DeleteTask } = require('../Controllers/Project.controller');
const { isAuth } = require('../Middlewares/Auth.middleware');

//this routes of user model
exports.ProjectRoutes = Router => {
    Router.get('/project/:Id', isAuth, _GetId);
    Router.get('/project', isAuth, _Get);
    Router.post('/project', isAuth, _Post);
    Router.put('/project/:Id', isAuth, _Put);
    Router.put('/project/:Id/messages', isAuth, _PushMessage);
    Router.put('/project/:Id/tables', isAuth, _PushTable);
    Router.put('/project/:Id/tables/:IdTable/tasks', isAuth, _PushTask);
    Router.delete('/project/:Id', isAuth, _Delete);
    Router.delete('/project/:Id/tables/:IdTable', isAuth, _DeleteTable);
    Router.delete('/project/:Id/tables/:IdTable/tasks/:IdTask', isAuth, _DeleteTask);
};