describe('Saucedemo test', () => {

    it(' Success Login to saucedemo', async () => {
        await browser.url('https://www.saucedemo.com/')

        // actions
        const username = await $('#user-name')
        const password = await $('#password')
        const loginButton = await $('//input[@id="login-button"]')

        await username.setValue('standard_user')
        await password.setValue('secret_sauce')
        await loginButton.click()

        // assertions
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  
        await expect(browser).toHaveTitle('Swag Labs')  
    })

    it('add to cart', async () => {
        await browser.url('https://www.saucedemo.com/')
        const username = await $('#user-name')
        const password = await $('#password')
        const loginButton = await $('//input[@id="login-button"]')

        await username.setValue('standard_user')
        await password.setValue('secret_sauce')
        await loginButton.click()

        // actions        
        await $('//button[@name="add-to-cart-sauce-labs-backpack"]').click() // add product to cart Sauce Labs Backpack
        await $('//button[@name="add-to-cart-sauce-labs-bike-light"]').click() // add product to cart Sauce Labs Bike Light
        await browser.pause(3000)

        // assertions
        const jumlahBarang = await $('//span[@class="shopping_cart_badge"]')
        await expect(jumlahBarang).toBeDisplayed()
        await expect(jumlahBarang).toHaveText('2') // memastikan ada 2 barang di keranjang

    })


})  

