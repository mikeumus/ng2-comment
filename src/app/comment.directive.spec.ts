import {
	async,
	beforeEachProviders,
	describe,
	ddescribe,
	expect,
	iit,
	it,
	inject
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import { provide, Component } from '@angular/core';
import { Comment } from './comment.directive';

@Component({
	selector: 'test-component',
	template: `<div comment></div>`
})
class TestComponent {}

describe('Comment Directive', () => {
	beforeEachProviders((): any[] => []);

	it('should ...', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
		return tcb.createAsync(TestComponent).then((fixture: ComponentFixture<any>) => {
			fixture.detectChanges();
		});
	})));
});
