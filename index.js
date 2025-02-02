const pup = require('puppeteer');

(async () => {
    const browser = await pup.launch();
    const page = await browser.newPage();
    console.log('Inicia o navegador')

    await page.goto('https://google.com')
    console.log('Acessa a pagina')

    await browser.close();
    console.log('finaliza o navegador')
})();