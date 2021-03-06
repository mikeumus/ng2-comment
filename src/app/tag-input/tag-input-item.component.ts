import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentEntity } from '../comment/comment.entity';

@Component({
	selector: 'tag-input-item',
	styleUrls: ['../comment/ng2comment.component.scss'],
	template:
	`{{text}}
	<span
	*ngIf="comment.editing" 
	class="ng2-tag-input-remove"
	(click)="removeTag()">&times;</span>`,
	
	styles: [`
	:host {
		display: inline-block;
		background: #ccc;
		padding: 7px;
		border-radius: 90px;
		margin-right: 10px;
	}

	:host.ng2-tag-input-item-selected {
		color: white;
		background: #0d8bff;
	}

	.ng2-tag-input-remove {
		cursor: pointer;
		display: inline-block;
		padding: 0 3px;
	}
	`],
	host: {
	'[class.ng2-tag-input-item-selected]': 'selected'
	}
})
export class TagInputItemComponent {
	@Input() selected: boolean;
	@Input() text: string;
	@Input() index: number;
	@Output() tagRemoved: EventEmitter<any> = new EventEmitter();
	@Input() comment: CommentEntity;
	
	constructor() {
	}

	removeTag(/*comment: CommentEntity*/) {
	// this.tags.splice(this.tags.indexOf(tag), 1);
	this.tagRemoved.emit(this.index);
	}
}
