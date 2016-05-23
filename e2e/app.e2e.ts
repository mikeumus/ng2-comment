import { Ng2commentPage } from './app.po';

describe('ng2comment App', function() {
  let page: Ng2commentPage;

  beforeEach(() => {
    page = new Ng2commentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng2comment works!');
  });
});
