import { StackexchangePage } from './app.po';

describe('stackexchange App', () => {
  let page: StackexchangePage;

  beforeEach(() => {
    page = new StackexchangePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
