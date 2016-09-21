import {
	beforeEachProviders,
	it,
	describe,
	expect,
	inject
} from '@angular/core/testing';
import { CommentStore } from './comment.service';

describe('Comment Service', () => {
	beforeEachProviders(() => [CommentStore]);

	it('should ...',
			inject([CommentStore], (service: CommentStore) => {
		expect(service).toBeTruthy();
	}));
});
