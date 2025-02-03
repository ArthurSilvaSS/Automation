const pup = require('puppeteer');

(async () => {
    //iniciando o navegador e uma nova guia
    const browser = await pup.launch();
    const page = await browser.newPage();

    console.log('Navegador iniciado !!');

    //gera o link de busca
    const LocalBuscado = prompt('digite o comercio a ser buscado');
    const CidadeBuscada = prompt('qual a cidade buscada');

    const link = `https://www.google.com/search?q=${encodeURIComponent(LocalBuscado)}+${encodeURIComponent(CidadeBuscada)}`;

    console.log(link)

    await page.goto(link);

    console.log('Acessa a pagina');

    await browser.close();
    console.log('finaliza o navegador');
})();