import { test, expect } from '@playwright/test';

const { LogInPage } = require('../../pages/log-in-page.js');
const { HeaderPage } = require('../../pages/header-page.js');
const { ForgotPasswordPage } = require('../../pages/forgot-password-page');
const { SignUpPage } = require('../../pages/sign-up-page');
const Users = require('../../fixtures/creds.json')
const Links = require('../../fixtures/links.json')


test('Log In', async ({ page }) => {
    const logInPage = new LogInPage(page);
    const headerPage = new HeaderPage(page);

    await logInPage.goto();
    await logInPage.login();

    expect(headerPage.userMenuBtn).toHaveText(Users.TestUser.username);
    await page.screenshot({ path: 'screenshots/registration/main_page_after_login.jpg'});
})


test('Log Out', async ({ page}) => {
    const logInPage = new LogInPage(page);
    const headerPage = new HeaderPage(page);

    await logInPage.goto();
    await logInPage.login();
    await headerPage.logOut();

    await expect(logInPage.loginForm).toBeVisible();
    await page.screenshot({ path: 'screenshots/registration/login_page_after_logout.jpg'});
})


test('Log In form validation', async ({ page }) => {
    const logInPage = new LogInPage(page);

    await logInPage.goto();

    //Valid unregistered email | Valid password
    await logInPage.emailField.fill('test@mail.com');
    await logInPage.passwordField.fill(Users.TestUser.password);
    await logInPage.loginBtn.click();
    await expect(logInPage.loginFailedMessage).toHaveText('login failed');
    expect(logInPage.invalidEmailMessage).not.toBe();
    expect(logInPage.invalidPasswordMessage).not.toBe();

    //Valid email | Invalid password
    await logInPage.emailField.fill(Users.TestUser.email);
    await logInPage.passwordField.fill('Invalid');
    await logInPage.loginBtn.click();
    await expect(logInPage.loginFailedMessage).toHaveText('login failed');

    //Invalid email | Valid password
    await logInPage.emailField.fill('Invalid');
    await logInPage.passwordField.fill(Users.TestUser.password);
    await logInPage.loginBtn.click()
    await expect(logInPage.invalidEmailMessage).toHaveText('Please enter a valid email.');

    //Empty email field | Empty password field
    await logInPage.emailField.fill('');
    await logInPage.passwordField.fill('');
    await logInPage.loginBtn.click();
    await expect(logInPage.invalidEmailMessage).toHaveText('Please enter your email.');
    await expect(logInPage.invalidPasswordMessage).toHaveText('Please enter your password.');
})


test('Forgot password form validation', async ({ page }) => {
    const logInPage = new LogInPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await logInPage.goto();
 
    await Promise.all([
        page.waitForNavigation({ 
          url: Links.forgotPasswordPageLink
        }),
        logInPage.forgotPasswordBtn.click()
    ]);
    await expect(forgotPasswordPage.forgotPasswordForm).toBeVisible();

    //Valid unregistered email
    await forgotPasswordPage.emailField.fill('test@mail.com');
    await forgotPasswordPage.sendBtn.click();
    await expect(forgotPasswordPage.noUserMessage).toHaveText('failed to get user');

    //Invalid email
    await forgotPasswordPage.emailField.fill('Invalid');
    await forgotPasswordPage.sendBtn.click();
    await expect(forgotPasswordPage.invalidEmailMessage).toHaveText('Please enter a valid email.');

    //Empty email field
    await forgotPasswordPage.emailField.fill('');
    await forgotPasswordPage.sendBtn.click();
    await expect(forgotPasswordPage.invalidEmailMessage).toHaveText('Please enter your email.');
})


test('Sign Up form validation', async ({ page }) => {
    const logInPage = new LogInPage(page);
    const signUpPage = new SignUpPage(page);

    await logInPage.goto();
    await logInPage.signUpBtn.click()

    //Empty email | Empty password
    await expect(signUpPage.emailField).toBeEmpty();
    await expect(signUpPage.passwordField).toBeEmpty();
    await signUpPage.registerBtn.click();
    await expect(signUpPage.invalidEmailMessage).toHaveText('Please enter your email.');
    await expect(signUpPage.invalidPasswordMessage).toHaveText('Please enter your password.');

    //Invalid email | Valid password
    await signUpPage.emailField.fill('Invalid');
    await signUpPage.passwordField.fill('Validpass123#');
    await signUpPage.registerBtn.click();
    await expect(signUpPage.invalidEmailMessage).toHaveText('Please enter a valid email.');
    expect(signUpPage.invalidPasswordMessage).not.toBe();

    //Valid email | Invalid password
    await signUpPage.emailField.fill('test@mail.com');
    await signUpPage.passwordField.fill('Invalid');
    await signUpPage.registerBtn.click();
    expect(signUpPage.invalidEmailMessage).not.toBe();
    await expect(signUpPage.invalidPasswordMessage).toHaveText('Please enter a valid password.');

    //Unckecked Terms and Conditions
    await expect(signUpPage.termsAndPrivacyPolicyCheckBox).not.toBeChecked()
    await signUpPage.registerBtn.click();
    await expect(signUpPage.acceptTermsAndConditionsErrorMessage).toHaveText('Please accept Terms and Conditions.')

    //Checked Terms and Conditions
    await signUpPage.termsAndPrivacyPolicyCheckBox.click()
    await signUpPage.registerBtn.click();
    expect(signUpPage.acceptTermsAndConditionsErrorMessage).not.toBe();

    //Verify hints for validation password
    //Empty password field
    await signUpPage.passwordField.fill('');
    await signUpPage.registerBtn.click();
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('password_validation_info.png');

    //1 uppercase letter
    await signUpPage.passwordField.fill('A');
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('pass_valid_1_uppercase_letter_check.png');

    //1 lowercase letter
    await signUpPage.passwordField.fill('a');
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('pass_valid_1_lowerrcase_letter_check.png');

    //1 special character
    await signUpPage.passwordField.fill('#');
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('pass_valid_1_special_character_check.png');

    //1 number
    await signUpPage.passwordField.fill('1');
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('pass_valid_1_number_check.png');

    //8 letters
    await signUpPage.passwordField.fill('Validpass');
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('pass_valid_8_letters_check.png');

    //Valid password
    await signUpPage.passwordField.fill('Validpass123#');
    expect(await signUpPage.passwordValidationInfoTable.screenshot()).toMatchSnapshot('password_validation_all_check.png');

    //Already used email | Valid password
    await signUpPage.emailField.fill(Users.TestUser.email);
    await signUpPage.passwordField.fill(Users.TestUser.password);
    await signUpPage.registerBtn.click();
    expect(signUpPage.invalidEmailMessage).not.toBe();
    expect(signUpPage.invalidPasswordMessage).not.toBe();
    await expect(signUpPage.alreadyExistUserMessage).toHaveText(`user ${Users.TestUser.email} already exists`)
})