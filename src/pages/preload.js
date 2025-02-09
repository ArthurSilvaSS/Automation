const { contextBridge, ipcRenderer } = require('electron');

// Expõe a API `ipcRenderer` de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});