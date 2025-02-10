const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload', 'preload.js'),
            enableRemoteModule: false,
            sandbox: true
        }
    });
    win.loadFile(path.join(__dirname, 'pages', 'index.html'));
}
app.whenReady().then(createWindow);