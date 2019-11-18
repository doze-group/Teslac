class Message {

    _id: String;
    Message: String;
    User: String;
    CreateAt: String;

    constructor(_id: String, Message: String, User: String, CreateAt: String) {
        this.Message = Message;
        this.User = User;
        this.CreateAt = CreateAt;
        this._id = _id;
    }

}