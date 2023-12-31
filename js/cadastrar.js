// Função Javascript para executar o Model antes do envio do formulário para o Banco de Dados
function cadastrarPaciente() {

    document.getElementById('meuBotao').addEventListener('click', function() {
        
        document.getElementById('meuFormulario').submit();

    });
    document.getElementById('mensagemCadastrar').textContent = 'Paciente Cadastrado com sucesso.';
}

  

