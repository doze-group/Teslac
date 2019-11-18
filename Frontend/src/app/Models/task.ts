class Task {

    _id: String;
    Task: String;
    Assigned: String;
    CreateAt: String;

    constructor(_id: String, Task: String, Assigned: String, CreateAt: String) {
        this.Task = Task;
        this.Assigned = Assigned;
        this.CreateAt = CreateAt;
        this._id = _id;
    }
}