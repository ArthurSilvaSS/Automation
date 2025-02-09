const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { perguntar, validarEntrada } = require('./utils/perguntar');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        heigt: 600,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('src/pages/index.html');
    win.webContents.openDevTools();
}
ipcMain.on('buscar', async (event, { servico, cidade }) => {
    try {
        // Valida os dados (usando suas funções de validação)
        const LocalBuscado = await validarEntrada(servico, '❌ O serviço desejado não pode estar vazio.');
        const CidadeBuscada = await validarEntrada(cidade, '❌ A cidade buscada não pode estar vazia.');

        // Aqui você pode chamar a função de busca com Puppeteer
        console.log('Serviço:', LocalBuscado);
        console.log('Cidade:', CidadeBuscada);

        // Exemplo de resposta para o frontend
        event.reply('resultado', { success: true, message: 'Busca realizada com sucesso!' });
    } catch (error) {
        event.reply('resultado', { success: false, message: error.message });
    }
});
app.whenReady().then(createWindow);