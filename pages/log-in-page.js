const { expect } = require('@playwright/test');

const Users = require('./../fixtures/creds.json')
const Links = require('./../fixtures/links.json')

exports.LogInPage = class LogInPage {
  
  constructor(page) {
    this.page = page;
    this.loginForm = page.locator('[data-testid="login-form"]');
    this.emailField = page.locator('[data-testid="login-form-input-email"]');
    this.passwordField = page.locator('[data-testid="login-form-input-password"]');
    this.loginBtn = page.locator('[data-testid="login-form-button-submit"]');
    this.signUpBtn = page.locator('[href="/auth/register?from=ccx"]');
    this.forgotPasswordBtn = page.locator('.LoginPage-forgot-password-ccx');
    this.loginFailedMessage = page.locator('.LoginPage-error-message');
    this.invalidEmailMessage = page.locator('xpath=//*[@data-testid="login-form-input-email"]//ancestor::*[contains(@class, "has-error")]//*[@class="ant-legacy-form-explain"]');
    this.invalidPasswordMessage = page.locator('xpath=//*[@data-testid="login-form-input-password"]//ancestor::*[contains(@class, "has-error")]//*[@class="ant-legacy-form-explain"]');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'networkidle' });
    expect(this.page.url()).toBe(Links.loginPageLink);
    await expect(this.loginForm).toBeVisible();
  }

  async login() {
    await this.emailField.fill(Users.TestUser.email);
    await this.passwordField.fill(Users.TestUser.password);

    await Promise.all([
        this.page.waitForNavigation({
          url: Links.mainPageLink
        }),
        await this.loginBtn.click()
    ]);
  }
}