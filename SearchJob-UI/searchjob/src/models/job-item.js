export default class JobItemModel {
    Title;
    Owner;
    Image;
    Status;
    IsFavourite;
    Tags;

    constructor(Title, Owner, Image, Status, IsFavourite, Tags) {
        this.Title = Title
        this.Owner = Owner
        this.Image = Image
        this.Status = Status
        this.IsFavourite = IsFavourite
        this.Tags = Tags
    }
}