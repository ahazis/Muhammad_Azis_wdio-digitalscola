describe('Saucedemo test', () => {

    it.skip(' Success Login to saucedemo', async () => {
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

    it.only('end to end test saucedemo', async () => {
        await browser.url('https://www.saucedemo.com/')
        const username = await $('#user-name')
        const password = await $('#password')
        const loginButton = await $('//input[@id="login-button"]')

        // // actions login saucedemo
        await username.setValue('standard_user')
        await password.setValue('secret_sauce')
        await loginButton.click()
        // assert login saucedemo
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        await expect(browser).toHaveTitle('Swag Labs')

        // // actions tambahkan barang ke cart   
        await $('//button[@name="add-to-cart-sauce-labs-backpack"]').click() // add product to cart Sauce Labs Backpack
        await $('//button[@name="add-to-cart-sauce-labs-bike-light"]').click() // add product to cart Sauce Labs Bike Light
        await browser.pause(1000)
        // assert Validate barang ke cart sukses
        const SauceLabsBackpack = await $('//a[@id="item_4_title_link" and @data-test="item-4-title-link"]') // ('//a[@ and @]')
        await expect(SauceLabsBackpack).toBeDisplayed()
        const SauceLabsBikeLight = await $('#item_0_title_link')
        await expect(SauceLabsBikeLight).toBeDisplayed()

        // // action klik keranjang untuk melihat produk yang sudah di tambahkan
        await $('//a[@class="shopping_cart_link" and @data-test="shopping-cart-link"]').click() // menambahkan "and" pada xpath
        await browser.pause(1000)
        // assert klik keranjang untuk melihat produk yang sudah di tambahkan
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        const cartTitle = await $('[data-test="title"]') // halaman your cart
        await expect(cartTitle).toBeDisplayed()
        await expect(cartTitle).toHaveText('Your Cart')
        const jumlahBarang = await $('//span[@class="shopping_cart_badge" and @data-test="shopping-cart-badge"]') // menambahkan "and" pada xpath
        await expect(jumlahBarang).toBeDisplayed()
        await expect(jumlahBarang).toHaveText('2') // memastikan ada 2 barang di keranjang
        
        
        // assertion untuk tombol checkout
        const checkoutButton = await $('//button[@data-test="checkout"and@id="checkout"]')
        await expect(checkoutButton).toBeDisplayed()
        await expect(checkoutButton).toBeClickable()
        await expect(checkoutButton).toHaveText('Checkout')
        // // action click button checkout
        await $('//button[@data-test="checkout"and@id="checkout"]').click()     
    })


})  

