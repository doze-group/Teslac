import { User } from './user';

export class Project {

    Messages: Array<Message>;
    Tables: Array<Table>;
    Admin: String;
    Members: Array<User>;
    Title: String;
    Description: String;
    CreateAt: String;

    constructor( Messages: Array<Message>, Tables: Array<Table>, Admin: String, Members: Array<User>, Title: String, Description: String, CreateAt: String){
        this.Messages = Messages;
        this.Tables = Tables;
        this.Admin = Admin;
        this.Members = Members;
        this.Title = Title;
        this.Description = Description;
        this.CreateAt = CreateAt;
    }
}