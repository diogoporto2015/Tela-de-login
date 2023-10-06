//Função para informar odados para imprimir o documento
function imprimirFicha(){
    document.getElementById('registroRecebe').innerHTML = document.getElementById('id_paciente').value;
    document.getElementById('idadeRecebido').innerHTML = calcularIdade(); 
    document.getElementById('dataRecebe').innerHTML = dataAt();
    document.getElementById('nomeRecebido').innerHTML = document.getElementById('nome').value;
    document.getElementById('cpfRecebido').innerHTML = document.getElementById('cpf').value;
    document.getElementById('nascRecebido').innerText = document.getElementById('data_nascimento').value;
    document.getElementById('endRecebido').innerHTML = document.getElementById('endereco').value;
    document.getElementById('numRecebido').innerHTML = document.getElementById('numero').value;
    document.getElementById('bairroRecebido').innerHTML = document.getElementById('bairro').value;
    document.getElementById('cidadeRecebido').innerHTML = document.getElementById('cidade').value;
    document.getElementById('estadoRecebido').innerHTML = document.getElementById('estado').value;
    document.getElementById('cepRecebido').innerHTML = document.getElementById('cep').value;
    document.getElementById('telRecebido').innerHTML = document.getElementById('telefone').value;
    document.getElementById('celRecebido').innerHTML = document.getElementById('celular').value;
    document.getElementById('sexoRecebido').innerHTML = document.getElementById('sexo').value;
    document.getElementById('nomeExameRecebido').innerHTML = document.getElementById('nome_exame').value;
    document.getElementById('tipoExameRecebio').innerHTML = document.getElementById('tipo_exame').value;
    document.getElementById('convRecebido').innerHTML = document.getElementById('convenio').value;
    document.getElementById('recebeComentario').innerHTML = document.getElementById('comentario').value;
    window.print();
}



// Função para mostrar o data Atual
function dataAt(){
    let data = new Date();
    return data.getDate() +"/"+ (data.getMonth()+1) +"/"+ data.getFullYear();
}



// Função para formatar a data de nascimento
function dataFor(){
    const dataInput = document.getElementById('data_nascimento').value;
    const dataObj = new Date(dataInput);
    const dataFormatada = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()}`;

    return dataFormatada;  // Saída: 18/07/2023
}

// Função para calcular a idade
function calcularIdade() {
    var dataNascimentoStr = document.getElementById("data_nascimento").value;
    var dataNascimentoParts = dataNascimentoStr.split('/');
    var dataNascimento = new Date(
        parseInt(dataNascimentoParts[2]),
        parseInt(dataNascimentoParts[1]) - 1,
        parseInt(dataNascimentoParts[0])
    );
    
    var hoje = new Date();
    var diff = hoje - dataNascimento;

    if (isNaN(dataNascimento) || diff < 0) {
        alert("Data de Nascimento inválida. Certifique-se de digitar no formato dd/mm/aaaa e uma data anterior à data atual.");
        return;
    }

    var idade = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
 
    let resultadoFinal = ``
    
    return resultadoFinal =  `${idade}  anos`
}














/*
 // Função para calcular a idade
function calcIdade(){

    var dataAtual = new Date()
    var dataNascimento = new Date(document.getElementById('data_nascimento').value)
    
    

    //Subtração dos anos
    var anos = dataAtual.getFullYear() - dataNascimento.getFullYear()

    //Análise dos meses
    if(dataAtual.getMonth() != dataNascimento.getMonth()){

        //Verificar a diferença nos meses
        if(dataAtual.getMonth() < dataNascimento.getMonth()){
            anos--;
        }
    }
    else{
        //Análise do dia do mês 
        if(dataAtual.getDate() < dataNascimento.get()){
            anos--;
        }
    }

    let resultadoFinal = ``
    
    return resultadoFinal =  `${anos}  anos`
    
}
*/

