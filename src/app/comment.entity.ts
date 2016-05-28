export class CommentEntity {
	public _id: number;
	public title: string;
	public commentContent: string;
	public tag: string;
	
	constructor(id: number, title: string, commentContent: string, tag: string){
		this._id = id;
		this.title = title;
		this.commentContent = commentContent;
		this.tag = tag;
	}
}