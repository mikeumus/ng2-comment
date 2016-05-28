import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { CommentEntity } from './comment.entity';

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
	
	private db: CommentEntity[] = [
		new CommentEntity(1,"title1","comment1","tag1")
	];
	
	
	constructor(/*private http: Http*/) {
		console.log(this.db);
		let persistedComments = JSON.parse(sessionStorage.getItem('bdb-comments') /*|| this.db*/ || '[]');
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
		debugger;
		this.comments.push(new Comment(commentContent));
		this.updateStorage();
	}
	
	private commentData = './comments-data.json';
	
	// loadInitComments(): Observable<IComment[]> {
	// 	return this.http.get(this.commentData) /*comments-data.json*/ /* ttp://jsonplaceholder.typicode.com/posts/1 */
	// 		.map(this.extractData)
	// 		.do(data => console.log('All: ' + JSON.stringify(data)))
	// 		.catch(this.handleError);
	// 		/*.subscribe(
	// 			data => {this.db.push(data); debugger; },
	// 			err => console.log(err),
	// 			() => console.log("Completed")
	// 		);*/
	// }
	
	// private extractData(res: Response) {
	// 	let body = res.json();
	// 	return body.data || { };
	// }
	
	// private handleError(error: any){
	// 	let errMsg = (error.message) ? error.message :
 //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
 //   console.error(errMsg); // log to console instead
 //   return Observable.throw(errMsg);
	// }
	
}
