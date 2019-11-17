export class User {
    Username: String;
    DisplayName: String;
    Email: String;
    Role: String;
    Institucional: String;
    UrlImage: String;
    Description: String;
    Token: String;
    CreateAt: String;

    constructor(Username: String, DisplayName: String, Email: String = '', Institucional: String = '', UrlImage: String, Description: String = '', Token: String = '', CreateAt: String = undefined){
        this.Username = Username;
        this.DisplayName = DisplayName;
        this.Email = Email;
        this.Institucional = Institucional;
        this.UrlImage = UrlImage;
        this.Description = Description;
        this.Token = Token;
        this.CreateAt = CreateAt;
    }
}

export class UserLogin {
    Username: String;
    Password: String;

    constructor(Username: String, Password: String) {
        this.Username = Username;
        this.Password = Password;
    }
}

export class UserRegistrer {
    Username: String;
    Password: String;
    Email: String;
    Institutional: String;
    DisplayName: String;
    Role: String;

    constructor(Username: String, Password: String, Email: String, Institutional: String, Role: String, DisplayName: String) {
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.Institutional = Institutional;
        this.DisplayName = DisplayName;
        this.Role = Role;
    }
}