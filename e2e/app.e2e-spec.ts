import { LaughingManPage } from './app.po';

describe('laughing-man App', () => {
  let page: LaughingManPage;

  beforeEach(() => {
    page = new LaughingManPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
