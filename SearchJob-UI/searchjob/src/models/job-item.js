export default class JobItemModel {
    PostId;
    CompanyId;
    Title;
    CompanyName;
    CompanyAvatar;
    IsFavourite;

    constructor(PostId, CompanyId, Title, CompanyName, CompanyAvatar, IsFavourite) {
        this.PostId = PostId
        this.CompanyId = CompanyId
        this.Title = Title
        this.CompanyName = CompanyName
        this.CompanyAvatar = CompanyAvatar
        this.IsFavourite = IsFavourite

    }
}