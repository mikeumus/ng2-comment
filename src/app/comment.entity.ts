export class CommentEntity {
	public _id: number;
	public title: string;
	public commentContent: string;
	public _commentContent: string;
	public tags: string[];
	public editing: boolean;
	
	constructor(id: number, title: string, commentContent: string, _commentContent: string, tags: string[], editing: boolean){
		this._id = id;
		this.title = title;
		this.commentContent = commentContent;
		this._commentContent = _commentContent;
		this.tags = tags;
		this.editing = editing;
	}
}

export class TagsEntity {
	public _id: number;
	public tagName: string[];
	
	constructor(id: number, tagName: string[]){
		this._id = id;
		this.tagName = tagName;
	}
}