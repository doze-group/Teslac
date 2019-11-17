import { User } from "./user";

export class Conversation {

    Messages: Array<Message>;
    Members: Array<User>;
    CreateAt: String;

    constructor(Messages: Array<Message>, Members: Array<User>, CreateAt: String = undefined) {
        this.Messages = Messages;
        this.Members = Members;
        this.CreateAt = CreateAt;
    }
}