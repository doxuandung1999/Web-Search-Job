export default class JobItemModel {
    PostId;
    CompanyId;
    Title;
    CompanyName;
    CompanyAvatar;
    IsFavourite;
    Status;

    constructor(PostId, CompanyId, Title, CompanyName, CompanyAvatar, IsFavourite,Status) {
        this.PostId = PostId
        this.CompanyId = CompanyId
        this.Title = Title
        this.CompanyName = CompanyName
        this.CompanyAvatar = CompanyAvatar
        this.IsFavourite = IsFavourite
        this.Status = Status

    }
}