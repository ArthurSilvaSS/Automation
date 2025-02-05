const puppeteer = require('puppeteer');
const readline = require('readline');

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

const extrairDados = async (page) => {
    return await page.evaluate(() => {
        const resultados = Array.from(document.querySelectorAll('div[jsaction*="mouseover:pane"]'));

        return resultados.map(item => {
            const nome = item.querySelector(".qBF1Pd")?.textContent?.trim() || "N/A";
            const avaliacao = item.querySelector(".MW4etd")?.textContent?.trim() || "N/A";
            const qtdAvaliacoes = item.querySelector(".UY7F9")?.textContent?.trim() || "N/A";
            const endereco = item.querySelector(".W4Efsd")?.textContent?.trim() || "N/A";
            const telefone = item.querySelector(".UsdlK")?.textContent?.trim() || "N/A";

            return { nome, avaliacao, qtdAvaliacoes, endereco, telefone };
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
            if (element){
                break;
            }
            previousHeight = newHeight;
        }
    });
};

(async () => {
    const LocalBuscado = "Mercado"
    // await perguntar('Digite o comércio a ser buscado: ');
    const CidadeBuscada = "Cidade de São Paulo"
    // await perguntar('Qual a cidade buscada: ');
    rl.close();

    const browser = await puppeteer.launch({ headless: true });
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
<<<<<<< HEAD

    // await browser.close();
=======
>>>>>>> 3051d556277d0d717279ef5277f7b65881e41fc5
})();