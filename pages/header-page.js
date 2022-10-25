const { expect } = require('@playwright/test');

const Links = require('./../fixtures/links.json')

exports.HeaderPage = class HeaderPage {

    constructor(page) {
        this.page = page;
        this.userMenuBtn = page.locator('[data-testid="UserMenuButton"]');
        this.accountBtn = page.locator('[data-testid="UserMenuAccountLink"]');
        this.logOutBtn = page.locator('[data-testid="UserMenuLogoutLink"]');
        this.createMenuBtn = page.locator('[data-testid="AppCreateButtonButton"]');
        this.createDataStoreBtn = page.locator('[data-testid="AppCreateButtonAddDataStoreLink"]');
        this.createVpcsBtn = page.locator('[data-testid="AppCreateButtonAddDataStoreLink"]');
        this.logoBtn = page.locator('[data-testid="AppLogoLink"]')
    }

    async logOut() {
        await this.userMenuBtn.click();
        await Promise.all([
            this.page.waitForNavigation({ 
              url: Links.loginPageLinkAfterLogOut
            }),
            await this.logOutBtn.click()
        ]);
    }
}
