class Table {

    _id: String;
    Title: String;
    Tasks: Array<Task>;
    CreateAt: String;

    constructor(_id: String, Title: String, Tasks: Array<Task>, CreateAt: String) {
        this.Title = Title;
        this.Tasks = Tasks;
        this.CreateAt = CreateAt;
        this._id = _id;
    }
}