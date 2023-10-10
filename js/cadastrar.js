// Função Javascript para executar o Model antes do envio do formulário para o Banco de Dados
function cadastrarPaciente() {
    document.getElementById('excluirExamesForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    
    document.getElementById('meuBotao').addEventListener('click', function() {
        document.getElementById('meuFormulario').submit();
    });
});
}
