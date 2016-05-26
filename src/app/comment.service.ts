import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { IComment } from './comment.entity';

@Injectable()	
export class Comment {
		
	editing: Boolean;
	
	private _commentContent: String;
	get commentContent() {
		return this._commentContent;
	}
	set commentContent(value: String) {
		this._commentContent = value.trim();
	}

	constructor(commentContent: String) {
		this.editing = false;
		this.commentContent = commentContent.trim();
	}

}

export class CommentStore {
	comments: Array<Comment>;
	
	// public db: IComment[] = [];
	
	constructor(private _http: Http) {
		let persistedComments = JSON.parse(sessionStorage.getItem('bdb-comments') || /*this.db ||*/ '[]');
		this.comments = persistedComments.map((comment: {_commentContent: String}) => {
			let ret = new Comment(comment._commentContent);
			return ret;
		});
	}
	
	private updateStorage() { 
		sessionStorage.setItem('bdb-comments', JSON.stringify(this.comments));
	}
	
	remove(comment: Comment) {
		this.comments.splice(this.comments.indexOf(comment), 1);
		this.updateStorage();
	}
	
	add(commentContent: String) {
		this.comments.push(new Comment(commentContent));
		this.updateStorage();
	}
	
	loadInitComments(): Observable<IComment[]> {
		return this._http.get('http://jsonplaceholder.typicode.com/posts/1') /*comments-data.json*/
			.map((response: Response) => <IComment[]> response.json())
			.do(data => console.log('All: ' + JSON.stringify(data)))
			.catch(this.handleError);
			/*.subscribe(
				data => {this.db.push(data); debugger; },
				err => console.log(err),
				() => console.log("Completed")
			);*/
	}
	
	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
	
}
