export default class JobItemModel {
    JobID
    Title;
    Owner;
    Image;
    Status;
    IsFavourite;
    Tags;

    constructor(Title, Owner, Image, Status, IsFavourite, Tags, JobID) {
        this.Title = Title
        this.Owner = Owner
        this.Image = Image
        this.Status = Status
        this.IsFavourite = IsFavourite
        this.Tags = Tags
        this.JobID = JobID
    }
}