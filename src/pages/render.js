const { ipcRenderer } = require('electron');

document.getElementById('buscar').addEventListener('click', () => {
    const servico = document.getElementById('servico').value;
    const cidade = document.getElementById('cidade').value;

    if (!servico || !cidade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Envia os dados para o backend usando a API exposta
    window.electronAPI.send('buscar', { servico, cidade });
});

// Recebe a resposta do backend
window.electronAPI.on('resultado', (result) => {
    if (result.success) {
        alert(result.message);
    } else {
        alert(`Erro: ${result.message}`);
    }
});