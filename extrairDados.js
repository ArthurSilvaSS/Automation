const extrairDados = async (page) => {
    // Seleciona todos os elementos que correspondem ao seletor
    const items = await page.$$('div[jsaction*="mouseover:pane"]');
    const resultados = [];

    for (const item of items) {
        const nome = await item
            .$eval('.qBF1Pd', el => el.textContent.trim())
            .catch(() => 'N/A');

        const avaliacao = await item
            .$eval('.MW4etd', el => el.textContent.trim())
            .catch(() => 'N/A');

        const qtdAvaliacoes = await item
            .$eval('.UY7F9', el => el.textContent.trim())
            .catch(() => 'N/A');

        const endereco = await item
            .$eval('.W4Efsd', el => el.textContent.trim())
            .catch(() => 'N/A');

        const telefone = await item
            .$eval('.UsdlK', el => el.textContent.trim())
            .catch(() => 'N/A');

        if (nome !== "N/A" && telefone !== "N/A") {
            resultados.push({ nome, avaliacao, qtdAvaliacoes, endereco, telefone });
        }
    }

    return resultados;
};

module.exports = extrairDados;
