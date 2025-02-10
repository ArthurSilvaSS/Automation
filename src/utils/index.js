
const puppeteer = require('puppeteer');
const { perguntar, validarEntrada } = require('./perguntar');
const extrairDados = require('../services/extrairDados');
const exibirDados = require('./exibirDados');
const gerarCSV = require('../services/gerarCSV');
const scrollFeed = require('../services/scrollFeed');


(async () => {
    const LocalBuscado = await perguntar(' 🛎️  Qual servico desejado:  ');
    LocalBuscado = await validarEntrada(LocalBuscado,
        ' ❌  O serviço desejado não pode estar vazio.');
    const CidadeBuscada = await perguntar(' 🏙️  Qual a cidade buscada: ');
    CidadeBuscada = await validarEntrada(CidadeBuscada,
        ' ❌  A cidade buscada não pode estar vazia.');
    rl.close();

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.clear();
    console.log(' 🔍  Gerando o link de acesso ...');

    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(LocalBuscado)}+${encodeURIComponent(CidadeBuscada)}`, {
        waitUntil: 'networkidle2',
        timeout: 60000
    });
    await page.waitForSelector('div[role="feed"]', { visible: true, timeout: 60000 });
    console.log(' ⏳  Carregando resultados ...');
    console.clear();
    await scrollFeed(page, { timeout: 10000 });
    const resultados = await extrairDados(page);
    exibirDados(resultados);
    gerarCSV(resultados, `${LocalBuscado}_${CidadeBuscada}.csv`);

    await browser.close();
})();
