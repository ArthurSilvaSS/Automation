const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        heigt: 600,
        webPreferences: {
            nodeIntergration: true,
            contextIsolation: false
        }
    });
    win.loadFile('index.html')
}
app.whenReady().then(createWindow);