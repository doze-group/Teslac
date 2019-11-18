import { User } from './user';

export class Project {

    _id: String;
    UrlImage: String;
    Messages: Array<Message>;
    Tables: Array<Table>;
    Admin: String;
    Members: Array<User>;
    Title: String;
    Description: String;
    CreateAt: String;

    constructor(UrlImage: String, _id: String, Messages: Array<Message>, Tables: Array<Table>, Admin: String, Members: Array<User>, Title: String, Description: String, CreateAt: String){
        this.Messages = Messages;
        this.Tables = Tables;
        this.Admin = Admin;
        this.Members = Members;
        this.Title = Title;
        this.Description = Description;
        this.CreateAt = CreateAt;
        this._id = _id;
        this.UrlImage = UrlImage;
    }
}

export class ProjectCreate {
    Title: String;
    Description: String;

    constructor(Title: String, Description: String){
        this.Title = Title;
        this.Description = Description;
    }
}