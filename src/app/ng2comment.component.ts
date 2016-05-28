import { Component } from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { CommentStore, Comment } from './comment.service';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon } from '@angular2-material/icon/icon';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { MdCard } from '@angular2-material/card/card';

@Component({
	moduleId: module.id,
	selector: 'ng2comment-app',
	templateUrl: 'ng2comment.component.html',
	styleUrls: ['ng2comment.component.css'],
	directives: [MdToolbar, MdInput, MdButton, MdIcon, MdCard],
	providers: [CommentStore, Comment , MdIconRegistry, /*HTTP_PROVIDERS*/]
})
export class Ng2commentAppComponent {
	title = 'Welome to BDB Comments';
	commentStore: CommentStore;
	newCommentContent = '';
	
	constructor(commentStore: CommentStore){
		this.commentStore = commentStore;
	}
	
	stopEditing(comment: Comment, editedComment: String){
		comment.commentContent = editedComment;
		comment.editing = false;
		debugger;
	}
	
	cancelEditingComment(comment: Comment){
		comment.editing = false;
		debugger;
	}
	
	updateEditingComment(comment: Comment, editedComment: String){
		editedComment = editedComment.trim();
		comment.editing = false;
		debugger;
		
		if(editedComment.length === 0){
			return this.commentStore.remove(comment);
		}
		
		comment.commentContent = editedComment;
	}
	
	editComment(comment: Comment){
		comment.editing = true;
	}
	
	remove(comment: Comment){
		this.commentStore.remove(comment);
	}
	
	addComment(){
		if(this.newCommentContent.trim().length){
			this.commentStore.add(this.newCommentContent);
			this.newCommentContent = '';
		}
	}

	public ngOnInit(){
		// this.commentStore.loadInitComments();
	}	
	
}
