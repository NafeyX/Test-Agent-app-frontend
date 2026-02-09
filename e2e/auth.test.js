describe('Authentication Flow', () => {
    const uniqueId = Date.now();
    const testEmail = `test${uniqueId}@example.com`;
    const testPassword = 'Abcdef.';
    const testName = `Test User${uniqueId}`;

    beforeAll(async () => {
        await device.launchApp();
    });

    it('should register, login and logout successfully', async () => {
        // --- 1. REGISTRATION ---
        await element(by.id('link-to-register')).tap();

        await element(by.id('register-name')).replaceText(testName);
        await element(by.id('register-email')).replaceText(testEmail);
        await element(by.id('register-password')).replaceText(testPassword);

        // Tap the Register button
        await element(by.id('register-button')).atIndex(0).tap();

        // Handle Success Alert
        // On Android, alerts can sometimes be slow or matched differently
        await waitFor(element(by.text('Success'))).toExist().withTimeout(15000);
        await element(by.text('OK')).tap();

        // Verify Home Screen
        await waitFor(element(by.text('Welcome!'))).toBeVisible().withTimeout(10000);

        // --- 2. LOGOUT ---
        await element(by.id('logout-button')).tap();
        await waitFor(element(by.text('Welcome Back'))).toBeVisible().withTimeout(10000);

        // --- 3. LOGIN ---
        await element(by.id('login-email')).replaceText(testEmail);
        await element(by.id('login-password')).replaceText(testPassword);
        await element(by.id('login-button')).tap();

        // Verify Home Screen again
        await waitFor(element(by.text('Welcome!'))).toBeVisible().withTimeout(10000);
        await expect(element(by.text(testName))).toBeVisible();

        // --- 4. FINAL LOGOUT ---
        await element(by.id('logout-button')).tap();
        await expect(element(by.text('Welcome Back'))).toBeVisible();
    });
});





