export class CommentEntity {
	public _id: number;
	public title: string;
	public commentContent: string;
	public _commentContent: string;
	public tag: string;
	public editing: boolean;
	
	constructor(id: number, title: string, commentContent: string, _commentContent: string, tag: string, editing: boolean){
		this._id = id;
		this.title = title;
		this.commentContent = commentContent;
		this._commentContent = _commentContent;
		this.tag = tag;
		this.editing = editing;
	}
}