import { Injectable } from '@angular/core';
import { CommentEntity, TagsEntity } from './comment.entity';

@Injectable()	
export class CommentStore {
	comments: Array<CommentEntity>;
	tags: Array<TagsEntity>;
	
	private initTags = ['one', 'two', 'three'];
	private newTags(tagArray: string[]){
		return new TagsEntity(tagArray);
	}
	private newComment(commentContent: string, tags: TagsEntity){
		return new CommentEntity(1, "title1", commentContent, undefined, this.newTags(tags), false);
	} 
	private initComment = this.newComment("comment1", this.initTags);
	
	private db: CommentEntity[] = [
		this.initComment
	];
	
	constructor() {
		let persistedTags = (JSON.parse(sessionStorage.getItem('bdb-tags')) || this.initTags);
		this.tags = persistedTags.map((tags: string[]) => {
			let ret = tags;
			return ret;
		});
		
		let persistedComments = (JSON.parse(sessionStorage.getItem('bdb-comments')) || this.db);
		this.comments = persistedComments.map((comment: {commentContent: string}, tags: string[]) => {
			let ret = this.newComment(comment.commentContent, tags);
			return ret;
		});
	}
	
	private updateStorage() { 
		sessionStorage.setItem('bdb-tags', JSON.stringify(this.tags));
		sessionStorage.setItem('bdb-comments', JSON.stringify(this.comments));
	}
	
	update(comment: CommentEntity, commentContent: string, tags: string[]) {
		this.comments.splice(this.comments.indexOf(comment), 1, this.newComment(commentContent, tags));
		this.updateStorage();
	}
	
	remove(comment: CommentEntity) {
		this.comments.splice(this.comments.indexOf(comment), 1);
		this.updateStorage();
	}
	
	add(commentContent: string, tagArry: string[]) {
		// this.tags.push(tags);
		this.comments.push(this.newComment(commentContent, tagArry));
		this.updateStorage();
	}
	
}
