import { Component } from '@angular/core';
import { NgForm } from '@angular/common';
import 'rxjs/Rx';
import { CommentStore } from './comment.service';
import { CommentEntity } from './comment.entity';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon } from '@angular2-material/icon/icon';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { MdCard } from '@angular2-material/card/card';
import { TagInputComponent } from './tag-input.component';

@Component({
	moduleId: module.id,
	selector: 'ng2comment-app',
	templateUrl: 'ng2comment.component.html',
	styleUrls: ['ng2comment.component.css'],
	directives: [MdToolbar, MdInput, MdButton, MdIcon, MdCard, TagInputComponent],
	providers: [CommentStore, MdIconRegistry]
})
export class Ng2commentAppComponent {
	title = 'Welome to BDB Comments';
	commentStore: CommentStore;
	newCommentContent = '';
	public tags = ['one', 'two', 'three'];
	
	// Initial placeholder comment data
	public comment = new CommentEntity(1, "title1", "comment1", this.newCommentContent, this.tags, false);
	
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
	
	updateEditingComment(comment: CommentEntity, editedComment: string, tags: string[]){
		editedComment = editedComment.trim();
		comment.editing = false;
		
		if(editedComment.length === 0){
			return this.commentStore.remove(comment);
		} else{
			return this.commentStore.update(comment, editedComment, tags);
		}
		
	}
	
	editComment(comment: CommentEntity){
		comment.editing = true;
	}
	
	remove(comment: CommentEntity){
		this.commentStore.remove(comment);
	}
	
	addComment(){
		if(this.newCommentContent.trim().length){
			this.commentStore.add(this.newCommentContent, this.tags);
			this.newCommentContent = '';
		}
	}
	
}
