import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { CommentStore } from './comment.service';
import { CommentEntity } from './comment.entity';
import { TagInputComponent } from '../tag-input/tag-input.component';

@Component({
	// moduleId: module.id,
	selector: 'ng2comment-app',
	templateUrl: 'ng2comment.component.html',
	styleUrls: ['ng2comment.component.scss'],
	providers: [CommentStore /*HTTP_PROVIDERS*/]
})
export class Ng2commentAppComponent {
	title = 'Welome to ng2 Comments';
	commentStore: CommentStore;
	newCommentContent = '';
	newCommentTitle = '';
	public tags = ['one', 'two', 'three'];
	
	public newTags(tagArray: string[]){
		return new Array(...tagArray);
	}

	// Initial placeholder comment data
	public comment = new CommentEntity(1, this.newCommentTitle, "comment1", this.newCommentContent, this.tags, false);
	
	constructor(commentStore: CommentStore){
		this.commentStore = commentStore;
	}
	
	stopEditing(comment: CommentEntity, editedComment: string){
		comment.commentContent = editedComment;
		comment.editing = false;
	}
	
	cancelEditingComment(comment: CommentEntity){
		comment.editing = false;
	}
	
	updateEditingComment(comment, newTitle, editedComment, tags: string[]){
		editedComment = editedComment.trim();
		comment.editing = false;
		
		if(editedComment.length === 0){
			return this.commentStore.remove(comment);
		} else{
			return this.commentStore.update(newTitle, comment, editedComment, this.newTags(this.tags));
		}
		
	}
	
	editComment(comment: CommentEntity){
		comment.editing = true;
		// debugger;
	}
	
	remove(comment: CommentEntity){
		this.commentStore.remove(comment);
	}
	
	addComment(){
		if(this.newCommentContent.trim().length){
			this.commentStore.add(this.newCommentTitle, this.newCommentContent, this.tags);
			this.newCommentContent = '';
		}
	}
	
}
