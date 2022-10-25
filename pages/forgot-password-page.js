const { expect } = require('@playwright/test');

const Users = require('./../fixtures/creds.json')
const Links = require('./../fixtures/links.json')

exports.ForgotPasswordPage = class ForgotPasswordPage {
  
  constructor(page) {
    this.page = page;
    this.forgotPasswordForm = page.locator('[data-testid="forgot-password-form"]');
    this.emailField = page.locator('[data-testid="forgot-password-form-input-email"]');
    this.backBtn = page.locator('[data-testid="forgot-password-form-button-back"]');
    this.sendBtn = page.locator('[data-testid="forgot-password-form-button-submit"]');
    this.invalidEmailMessage = page.locator('xpath=//*[@data-testid="forgot-password-form-input-email"]//ancestor::*[contains(@class, "has-error")]//*[@class="ant-legacy-form-explain"]');
    this.noUserMessage = page.locator('.ant-alert-message')
  }
}