const { expect } = require('@playwright/test');

const Users = require('./../fixtures/creds.json')
const Links = require('./../fixtures/links.json')

exports.SignUpPage = class SignUpPage {
  
  constructor(page) {
    this.page = page;
    this.signUpForm = page.locator('[data-testid="register-form"]');
    this.emailField = page.locator('[data-testid="register-form-input-email"]');
    this.passwordField = page.locator('[data-testid="register-form-input-password"]');
    this.marketingMessageCheckBox = page.locator('[data-testid="register-form-input-send-communications"]');
    this.termsAndPrivacyPolicyCheckBox = page.locator('[data-testid="register-form-input-terms-and-conditions"]');
    this.registerBtn = page.locator('[data-testid="register-form-button-submit"]');
    this.invalidEmailMessage = page.locator('xpath=//*[@data-testid="register-form-input-email"]//ancestor::*[contains(@class, "has-error")]//*[@class="ant-legacy-form-explain"]');
    this.invalidPasswordMessage = page.locator('xpath=//*[@data-testid="register-form-input-password"]//ancestor::*[contains(@class, "has-error")]//*[@class="ant-legacy-form-explain"]');
    this.acceptTermsAndConditionsErrorMessage = page.locator('xpath=//*[@data-testid="register-form-input-terms-and-conditions"]//ancestor::*[contains(@class, "has-error")]//*[@class="ant-legacy-form-explain"]');
    this.passwordValidationInfoTable = page.locator('.PasswordValidationInfo');
    this.alreadyExistUserMessage = page.locator('.ant-alert-message');
  }
}