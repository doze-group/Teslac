import { User } from "./user";

export class Conversation {

    _id: String;
    Messages: Array<Message>;
    Members: Array<User>;
    CreateAt: String;

    constructor(_id: String, Messages: Array<Message>, Members: Array<User>, CreateAt: String = undefined) {
        this.Messages = Messages;
        this.Members = Members;
        this.CreateAt = CreateAt;
        this._id = _id;
    }
}

export class ConversationCreate {
    Members: Array<String>;
    constructor(Members: Array<String>) {
        this.Members = Members;
    }
}