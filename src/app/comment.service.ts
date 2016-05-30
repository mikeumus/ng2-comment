import { Injectable } from '@angular/core';
import { CommentEntity } from './comment.entity';

@Injectable()	
export class CommentStore {
	comments: Array<CommentEntity>;
	
	private db: CommentEntity[] = [
		new CommentEntity(1, "title1", "comment1", "comment1", "tag1", false)
	];
	
	constructor() {
		let persistedComments = (JSON.parse(sessionStorage.getItem('bdb-comments')) || this.db);
		this.comments = persistedComments.map((comment: {commentContent: string}) => {
			let ret = new CommentEntity(2, "title2", comment.commentContent, undefined, "tag2", false);
			return ret;
		});
	}
	
	private updateStorage() { 
		sessionStorage.setItem('bdb-comments', JSON.stringify(this.comments));
	}
	
	update(comment: CommentEntity, commentContent: string) {
		this.comments.splice(this.comments.indexOf(comment), 1, new CommentEntity(3, "title3", commentContent, undefined, "tag3", false));
		this.updateStorage();
	}
	
	remove(comment: CommentEntity) {
		this.comments.splice(this.comments.indexOf(comment), 1);
		this.updateStorage();
	}
	
	add(commentContent: string, tag: string) {
		this.comments.push(new CommentEntity(2, "title2", commentContent, undefined, tag, false));
		this.updateStorage();
	}
	
}
