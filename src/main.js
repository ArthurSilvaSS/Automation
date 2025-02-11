const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const puppeteer = require('puppeteer');
const extrairDados = require('./services/extrairDados');
const gerarCSV = require('./services/gerarCSV');
const scrollFeed = require('./services/scrollFeed');
const readline = require('readline');

// Configuração do readline para entrada de dados no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload', 'preload.js'),
            devTools: true,
            enableRemoteModule: false,
            sandbox: true
        }
    });
    win.loadFile(path.join(__dirname, 'pages', 'index.html'));
}

// Função para perguntar ao usuário (usada no terminal)
function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

// Função para validar a entrada do usuário
function validarEntrada(entrada, mensagemErro) {
    if (!entrada || entrada.trim() === '') {
        console.log(mensagemErro);
        process.exit(1); // Encerra o programa se a entrada for inválida
    }
    return entrada.trim();
}

// Captura os dados do frontend e executa o Puppeteer
console.log('main.js carregado!');
ipcMain.handle('buscar', async (event, { servico, cidade }) => {
    try {
        console.log(`🔎 Buscando: ${servico} em ${cidade}...`);
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        console.log('Navegador aberto. Navegando para a página...');
        await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(servico)}+${encodeURIComponent(cidade)}`, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        console.log('Página carregada. Aguardando seletor...');
        await page.waitForSelector('div[role="feed"]', { visible: true, timeout: 60000 });

        console.log('⏳ Carregando resultados...');
        await scrollFeed(page, { timeout: 10000 });

        console.log('Extraindo dados...');
        const resultados = await extrairDados(page);

        console.log('Gerando CSV...');
        gerarCSV(resultados, `${servico}_${cidade}.csv`);

        await browser.close();

        console.log('✅ Busca concluída!');
        return { success: true, message: 'Busca concluída!', data: resultados };
    } catch (error) {
        console.error("❌ Erro ao buscar:", error);
        return { success: false, message: 'Erro na busca.' };
    }
});


// Inicia o Electron
app.whenReady().then(() => {
    createWindow();

    // Opcional: Executar a busca diretamente no terminal (sem frontend)
    if (process.argv.includes('--terminal')) {
        (async () => {
            const servico = await perguntar(' 🛎️  Qual serviço desejado: ');
            validarEntrada(servico, ' ❌  O serviço desejado não pode estar vazio.');

            const cidade = await perguntar(' 🏙️  Qual a cidade buscada: ');
            validarEntrada(cidade, ' ❌  A cidade buscada não pode estar vazia.');

            rl.close();

            // Dispara o evento de busca manualmente
            ipcMain.emit('buscar', null, { servico, cidade });
        })();
    }
});

// Fecha o app quando todas as janelas são fechadas
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});