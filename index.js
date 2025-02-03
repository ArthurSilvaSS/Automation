const { resolve } = require('path');
const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const perguntar = (pergunta) => {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(resposta)
        });
    });
};

(async () => {
    const LocalBuscado = await perguntar('digite o comercio a ser buscado: ');
    const CidadeBuscada = await perguntar('qual a cidade buscada: ');

    rl.close();

    const link = `https://www.google.com/search?q=${encodeURIComponent(LocalBuscado)}+${encodeURIComponent(CidadeBuscada)}`;
    console.log(link)

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: 'load' });

    console.log('Acessa a pagina');

    await browser.close();
    console.log('finaliza o navegador');
})();