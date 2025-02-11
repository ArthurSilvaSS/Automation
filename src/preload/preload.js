console.log('preload.js carregado!');

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    buscar: (servico, cidade) => {
        console.log('Chamando método buscar...');
        return ipcRenderer.invoke('buscar', { servico, cidade });
    },
    onResultado: (callback) => {
        console.log('Registrando listener para resultado...');
        ipcRenderer.on('resultado', (event, data) => callback(data));
    }
});