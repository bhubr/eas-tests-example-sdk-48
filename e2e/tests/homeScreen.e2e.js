const { openApp } = require('./utils/openApp');

describe('Home screen', () => {
  beforeEach(async () => {
    await openApp();
  });

  it('"Click me" button should be visible', async () => {
    await expect(element(by.id('click-me-button'))).toBeVisible();
  });

  it('shows "Hello World!" after tapping "Click me"', async () => {
    await element(by.id('click-me-button')).tap();
    await expect(element(by.text('Hello World!'))).toBeVisible();
  });

  it('shows "accusamus beatae..." below photo after tapping "Click me"', async () => {
    await element(by.id('click-me-button')).tap();
    await expect(element(by.text('accusamus beatae ad facilis cum similique qui sunt'))).toBeVisible();
  });
});
