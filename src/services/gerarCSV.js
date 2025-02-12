const { dialog, app } = require('electron');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

function gerarCSV(resultados, mainWindow) {
    // Abrir a caixa de diálogo para escolher onde salvar o arquivo
    dialog.showSaveDialog(mainWindow, {
        title: 'Salvar arquivo CSV',
        defaultPath: path.join(app.getPath('desktop'), 'resultados.csv'),
        filters: [{ name: 'CSV Files', extensions: ['csv'] }]
    }).then(result => {
        if (!result.canceled && result.filePath) {
            const csvWriter = createCsvWriter({
                path: result.filePath,
                header: [
                    { id: 'nome', title: 'Nome' },
                    { id: 'avaliacao', title: 'Avaliacao' },
                    { id: 'qtdAvaliacoes', title: 'Quantidade de Avaliações' },
                    { id: 'endereco', title: 'Endereço' },
                    { id: 'telefone', title: 'Telefone' }
                ]
            });

            csvWriter.writeRecords(resultados)
                .then(() => console.log(`Arquivo CSV salvo em: ${result.filePath}`))
                .catch(err => console.error('Erro ao salvar CSV:', err));
        } else {
            console.log('Salvamento cancelado pelo usuário.');
        }
    }).catch(err => console.error('Erro ao abrir o explorador:', err));
}

module.exports = gerarCSV;
