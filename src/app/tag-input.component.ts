import { Component, HostBinding, Input, Output, Provider, forwardRef, EventEmitter } from '@angular/core';
import { isBlank } from '@angular/core/src/facade/lang';
import { TagInputItemComponent } from './tag-input-item.component';
import { CommentEntity } from './comment.entity'
import { CommentStore } from './comment.service';

@Component({
	selector: 'tag-input',
	styleUrls: ['app/ng2comment.component.css'],
	template:
	`<tag-input-item
	[comment]="comment" 
	class="tag" 
	[text]="tag"
	[index]="index"
	[selected]="selectedTag === index"
	(tagRemoved)="_removeTag($event)"
	*ngFor="let tag of tagsList; let index = index">
	</tag-input-item>
	<input 
	*ngIf="comment.editing" 
	class="ng2-tag-input-field"
	type="text"
	[placeholder]="placeholder"
	[(ngModel)]="inputValue"
	(paste)="inputPaste($event)"
	(keydown)="inputChanged($event)"
	(blur)="inputBlurred($event)"
	(focus)="inputFocused()"
	#tagInputRef>`,

	styles: [`
	:host {
		display: block;
		box-shadow: 0 1px #ccc;
		padding: 5px 0;
	}

	:host.ng2-tag-input-focus {
		box-shadow: 0 2px #0d8bff;
	}

	.ng2-tag-input-field {
		box-shadow: none;
		border: 0;
	}
	`],
	directives: [TagInputItemComponent]
})
export class TagInputComponent {
	@Input() placeholder: string = 'Add a tag';
	@Input() delimiterCode: string = '188';
	@Input() addOnBlur: boolean = true;
	@Input() addOnEnter: boolean = true;
	@Input() addOnPaste: boolean = true;
	@Input() allowedTagsPattern: RegExp = /.+/;
	@HostBinding('class.ng2-tag-input-focus') isFocussed;
	@Input() comment: CommentEntity;

	public commentStore: CommentStore;
	public tagsList: string[];
	public inputValue: string = '';
	public delimiter: number;
	public selectedTag: number;
	
	constructor(commentStore: CommentStore){
		this.commentStore = commentStore;
	}

	ngOnInit() {
	if (this.comment.tagArray) this.tagsList = this.comment.tagArray;
	this.onChange(this.tagsList);
	this.delimiter = parseInt(this.delimiterCode);
	}

	ngAfterViewInit() {
	// If the user passes an undefined variable to comment this will warn
	// and set the value to an empty array
	if (!this.tagsList) {
		console.warn('TagInputComponent was passed an undefined value in comment. Please make sure the variable is defined.');
		this.tagsList = [];
		this.onChange(this.tagsList);
	}
	}

	inputChanged(event) {
	let key = event.keyCode;
	switch(key) {
		case 8: // Backspace
		this._handleBackspace();
		break;
		case 13: // Enter
		if (this.inputValue.trim() !== ""){
			this.addOnEnter && this._addTags([this.inputValue]);
		}
		event.preventDefault();
		break;

		case this.delimiter:
		this._addTags([this.inputValue]);
		event.preventDefault();
		break;

		default:
		this._resetSelected();
		break;
	}
	}

	inputBlurred(event) {
	this.addOnBlur && this._addTags([this.inputValue]);
	this.isFocussed = false;
	}
	inputFocused(event) {
	this.isFocussed = true;
	}

	inputPaste(event) {
	let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
	let pastedString = clipboardData.getData('text/plain');
	let tags = this._splitString(pastedString);
	let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
	this._addTags(tagsToAdd);
	setTimeout(() => this.inputValue = '', 3000);
	}

	private _splitString(tagString: string) {
	tagString = tagString.trim();
	let tags = tagString.split(String.fromCharCode(this.delimiter));
	return tags.filter((tag) => !!tag);
	}

	private _isTagValid(tagString: string) {
	return this.allowedTagsPattern.test(tagString);
	}

	private _addTags(tags: string[]) {
	let validTags = tags.filter((tag) => this._isTagValid(tag));
	this.tagsList = this.tagsList.concat(validTags);
	this.comment.tagArray = this.tagsList;
	this.commentStore.tags.push(validTags);
	this.commentStore.updateTagsStorage();
	this._resetSelected();
	this._resetInput();
	this.onChange(this.tagsList);
	}

	private _removeTag(tagIndexToRemove) {
	this.tagsList.splice(tagIndexToRemove, 1);
	this.commentStore.tags.splice(tagIndexToRemove, 1);
	this.commentStore.updateTagsStorage();
	this._resetSelected();
	this.onChange(this.tagsList);
	}

	private _handleBackspace() {
	if (!this.inputValue.length && this.tagsList.length) {
		if (!isBlank(this.selectedTag)) {
		this._removeTag(this.selectedTag);
		}
		else {
		this.selectedTag = this.tagsList.length - 1;
		}
	}
	}

	private _resetSelected() {
	this.selectedTag = null;
	}

	private _resetInput() {
	this.inputValue = '';
	}

	/** Implemented as part of ControlValueAccessor. */
	onChange: (value) => any = () => { };

	onTouched: () => any = () => { };

	writeValue(value: any) { }

	registerOnChange(fn: any) {
	this.onChange = fn;
	}

	registerOnTouched(fn: any) {
	this.onTouched = fn;
	}
}
