class Table {

    Title: String;
    Tasks: Array<Task>;
    CreateAt: String;

    constructor(Title: String, Tasks: Array<Task>, CreateAt: String) {
        this.Title = Title;
        this.Tasks = Tasks;
        this.CreateAt = CreateAt;
    }
}