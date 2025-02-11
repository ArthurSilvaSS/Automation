document.addEventListener("DOMContentLoaded", () => {
    const botaoBuscar = document.getElementById("buscar");
    const inputServico = document.getElementById("servico");
    const inputCidade = document.getElementById("cidade");

    botaoBuscar.addEventListener("click", () => {
        const servico = inputServico.value.trim();
        const cidade = inputCidade.value.trim();

        if (!servico || !cidade) {
            alert("❌ Preencha todos os campos!");
            return;
        }

        // Enviar os dados para o processo principal (main.js) via preload.js
        window.api.buscar({ servico, cidade });
    });

    // Receber a resposta do main.js
    window.api.receberResultado((resposta) => {
        console.log("📩 Resposta do backend:", resposta);
        alert(resposta.message);
    });
});
