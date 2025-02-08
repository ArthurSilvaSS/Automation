const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function gerarCSV(resultados, nomeArquivo = 'resultados.csv') {
    // Define o cabecalho do CSV
    const csvWriter = createCsvWriter({
        path: nomeArquivo,
        header: [
            { id: 'nome', title: 'Nome' },
            { id: 'avaliacao', title: 'Avaliacao' },
            { id: 'qtdAvaliacoes', title: 'Quantidade de Avaliações' },
            { id: 'endereco', title: 'Endereço' },
            { id: 'telefone', title: 'Telefone' }
        ]
    });

    csvWriter.writeRecords(resultados)
        .then(() => {
            console.log(`Arquivo CSV "${nomeArquivo}" gerado com sucesso!`);
        })
        .catch((err) => {
            console.error("Erro ao gerar o arquivo CSV:", err);
        });
};
module.exports = gerarCSV;