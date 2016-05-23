export class Ng2commentPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2comment-app h1')).getText();
  }
}
