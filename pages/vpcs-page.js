const { expect } = require('@playwright/test');

exports.VpcsPage = class VpcsPage {

    constructor(page) {
        this.page = page;
        this.createVpcsBtn = page.locator('[data-testid="CreateVpcButton"]');
        this.dataStoreNavBtn = page.locator('[rc-tabs-8-tab-data-stores]');
    }
}