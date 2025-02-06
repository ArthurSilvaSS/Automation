
const puppeteer = require('puppeteer');
const readline = require('readline');
const extrairDados = require('./extrairDados');

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

const scrollFeed = async (page) => {
    await page.evaluate(async () => {
        const feed = document.querySelector('div[role="feed"]');
        if (!feed) return;

        let previousHeight = 0;
        while (true) {
            feed.scrollTo(0, feed.scrollHeight);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const element = document.querySelector('.HlvSq');
            const newHeight = feed.scrollHeight;
            if (element) {
                break;
            }
            previousHeight = newHeight;
        }
    });
};

(async () => {
    const LocalBuscado = "medicos"
    // await perguntar('Digite o comércio a ser buscado: ');
    const CidadeBuscada = "santa rita do passa quatro"
    // await perguntar('Qual a cidade buscada: ');
    rl.close();

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(LocalBuscado)}+${encodeURIComponent(CidadeBuscada)}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    await scrollFeed(page);
    const resultados = await extrairDados(page);

    // Exibe os resultados formatados no console
    console.log("\n📋 Resultados encontrados:");
    resultados.forEach((item, index) => {
        console.log(`\n=== Item ${index + 1} ===`);
        console.log(`Nome: ${item.nome}`);
        console.log(`Avaliação: ${item.avaliacao}`);
        console.log(`Quantidade de avaliações: ${item.qtdAvaliacoes}`);
        console.log(`Endereço: ${item.endereco}`);
        console.log(`Telefone: ${item.telefone}`);
    });
    await browser.close();
})();
