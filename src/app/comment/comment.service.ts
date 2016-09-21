import { Injectable } from '@angular/core';
import { CommentEntity } from './comment.entity';

@Injectable()	
export class CommentStore {
	comments: Array<CommentEntity>;
	tags: Array<string[]>;
	
	public commentId: number = 1;
	private initTags: string[] = ['one', 'two', 'three'];
	public newTags(tagArray){
		return new Array(...tagArray);
	}
	public newComment(commentId: number, title: string, commentContent: string, tagArray: string[]){
		return new CommentEntity(commentId, title, commentContent, undefined, this.newTags(this.tags), false);
	} 
	public initComment = this.newComment(this.commentId, "First Comment", "Hi There :D", this.newTags(this.tags));
	
	public db: CommentEntity[] = [
		this.initComment
	];
	
	constructor() {
		let persistedTags = (JSON.parse(sessionStorage.getItem('ng2-tags')) || this.initTags);
		this.tags = persistedTags.map((tagArray: string) => {
			return tagArray;
		});
		
		let persistedComments = (JSON.parse(sessionStorage.getItem('ng2-comments')) || this.db);
		this.comments = persistedComments.map((comment: {_id: number, title: string, commentContent: string, tagArray: string[]}) => {
			let ret = this.newComment(this.commentId, comment.title, comment.commentContent, comment.tagArray);
			this.commentId += 1;
			return ret;
		});
	}
	
	private updateStorage() { 
		sessionStorage.setItem('ng2-comments', JSON.stringify(this.comments));
	}
	
	public updateTagsStorage(){
		sessionStorage.setItem('ng2-tags', JSON.stringify(this.tags));
	}

	update(comment: CommentEntity, title: string, commentContent: string, tagArray: string[]) {
		this.comments.splice(this.comments.indexOf(comment), 1, this.newComment(comment._id, title, commentContent, tagArray));
		this.updateStorage();
	}
	
	remove(comment: CommentEntity) {
		this.comments.splice(this.comments.indexOf(comment), 1);
		this.updateStorage();
	}
	
	add(title: string, commentContent: string, tagArray: string[]) {
		// this.tags.push(tags);
		this.commentId += 1;
		this.comments.push(this.newComment(this.commentId, title, commentContent, tagArray));
		this.updateStorage();
	}
	
}
