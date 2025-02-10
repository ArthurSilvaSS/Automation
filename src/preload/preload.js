const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    buscar: (data) => ipcRenderer.send('buscar', data), // Envia os dados para o main.js
    receberResultado: (callback) => ipcRenderer.on('resultado', (_, response) => callback(response)) // Escuta os resultados
});