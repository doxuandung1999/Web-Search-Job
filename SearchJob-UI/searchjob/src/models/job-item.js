export default class JobItemModel {
    PostId;
    CompanyId;
    Title;
    CompanyName;
    CompanyAvatar;
    IsFavourite;
    Status;
    ExpireDate;

    constructor(PostId, CompanyId, Title, CompanyName, CompanyAvatar, IsFavourite,Status,ExpireDate) {
        this.PostId = PostId
        this.CompanyId = CompanyId
        this.Title = Title
        this.CompanyName = CompanyName
        this.CompanyAvatar = CompanyAvatar
        this.IsFavourite = IsFavourite
        this.Status = Status
        this.ExpireDate = ExpireDate

    }
}