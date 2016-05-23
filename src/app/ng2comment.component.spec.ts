import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2commentAppComponent } from '../app/ng2comment.component';

beforeEachProviders(() => [Ng2commentAppComponent]);

describe('App: Ng2comment', () => {
  it('should create the app',
      inject([Ng2commentAppComponent], (app: Ng2commentAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2comment works!\'',
      inject([Ng2commentAppComponent], (app: Ng2commentAppComponent) => {
    expect(app.title).toEqual('ng2comment works!');
  }));
});
