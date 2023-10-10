function excluirExames() {
    const pacienteId = document.getElementById('pacienteId').value;

    fetch(`/api/pacientes/${pacienteId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('mensagemDeletar').textContent = 'Paciente excluídos com sucesso.';
        } else if (response.status === 404) {
            document.getElementById('mensagemDeletar').textContent = 'ID do paciente não encontrado.';
        } else {
            document.getElementById('mensagemDeletar').textContent = 'Erro ao excluir os Paciente.';
        }
    })
    .catch(error => {
        console.error('Erro ao excluir os exames:', error);
        document.getElementById('mensagemDeletar').textContent = 'Erro ao excluir os Paciente.';
    });
}