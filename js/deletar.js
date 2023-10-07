function excluirExames() {
    const pacienteId = document.getElementById('pacienteId').value;

    fetch(`/api/pacientes/${pacienteId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('mensagem').textContent = 'Exames excluídos com sucesso.';
        } else if (response.status === 404) {
            document.getElementById('mensagem').textContent = 'ID do paciente não encontrado.';
        } else {
            document.getElementById('mensagem').textContent = 'Erro ao excluir os exames.';
        }
    })
    .catch(error => {
        console.error('Erro ao excluir os exames:', error);
        document.getElementById('mensagem').textContent = 'Erro ao excluir os exames.';
    });
}