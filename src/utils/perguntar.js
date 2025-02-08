const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const perguntar = (pergunta) => {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(resposta.trim());
        });
    });
};
async function validarEntrada(entrada, mensagemErro) {
    while (!entrada) {
        console.log(mensagemErro);
        entrada = await perguntar('Por favor, insira novamente: ')
    }
    return entrada;
}
module.exports = { perguntar, validarEntrada };