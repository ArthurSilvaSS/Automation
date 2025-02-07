
const puppeteer = require('puppeteer');
const readline = require('readline');
const extrairDados = require('./extrairDados');
const exibirDados = require('./exibirDados');
const gerarCSV = require('./gerarCSV');
const scrollFeed = require('./scrollFeed');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const perguntar = (pergunta) => {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(resposta.trim());
        });
    });
};
(async () => {
    const LocalBuscado = await perguntar('Digite o comércio a ser buscado: ');
    const CidadeBuscada = await perguntar('Qual a cidade buscada: ');
    rl.close();

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(LocalBuscado)}+${encodeURIComponent(CidadeBuscada)}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
    });
    await page.waitForSelector('div[role="feed"]', { visible: true, timeout: 30000 });
    await scrollFeed(page, { timeout: 10000 });
    const resultados = await extrairDados(page);
    exibirDados(resultados);
    gerarCSV(resultados, `${LocalBuscado}_${CidadeBuscada}.csv`);

    await browser.close();
})();
