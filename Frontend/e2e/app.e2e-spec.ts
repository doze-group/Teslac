import { ProtractorPage } from './app.po';

describe('protractor App', () => {
  let page: ProtractorPage;

  beforeEach(() => {
    page = new ProtractorPage();
  });

  it('should display translated title "Teslac :: Home"', () => {
    page.navigateTo();
    expect<any>(page.getPageTitleText()).toEqual('Teslac :: Home');
  });

  it('should contain a news section', () => {
    page.navigateTo();
    expect<any>(page.getHomePageNewsText()).toBeDefined();
  });
});
