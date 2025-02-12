function exibirDados(resultados) {
    console.log("\n Resultados encontrados:");
    resultados.forEach((item, index) => {
        console.log(`\n=== Item ${index + 1} ===`);
        console.log(`Nome: ${item.nome}`);
        console.log(`Avaliação: ${item.avaliacao}`);
        console.log(`Quantidade de avaliações: ${item.qtdAvaliacoes}`);
        console.log(`Endereço: ${item.endereco}`);
        console.log(`Telefone: ${item.telefone}`);
    });
}
module.exports = exibirDados;