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

    const link = `https://www.bing.com/maps?q=${encodeURIComponent(LocalBuscado)}+${encodeURIComponent(CidadeBuscada)}`;
    console.log(link)

    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto(link, { waitUntil: 'networkidle2' });

    console.log('Acessa a pagina');

    //await browser.close();
    //console.log('finaliza o navegador');
})();