export class ResourcesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('resources-app h1')).getText();
  }
}
