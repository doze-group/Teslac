import { User } from './user';

export class Group {

    DisplayName: String;
    UrlImage: String;
    Messages: Array<Message>;
    Admin: String;
    CreateAt: String;
    Members: Array<User>;

    constructor(DisplayName: String, UrlImage: String = undefined, Messages: Array<Message>, Admin: String, CreateAt: String = undefined, Members: Array<User>) {
        this.DisplayName = DisplayName;
        this.UrlImage = UrlImage;
        this.Messages = Messages;
        this.Admin = Admin;
        this.CreateAt = CreateAt;
        this.Members = Members;
    }

}