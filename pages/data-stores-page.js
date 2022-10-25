const { expect } = require('@playwright/test');

exports.DataStorePage = class HeaderPage {

    constructor(page) {
        this.page = page;
        this.addFirstDataStoreBtn = page.locator('[data-testid="DataStoresCreateFirstButton"]');
        this.createDataStoreBtn = page.locator('[data-testid="ProjectsCreateNewButton"]');
        this.vpcsNavBtn = page.locator('#rc-tabs-2-tab-vpcs');
    }
}