//Instalar nodemon de forma global
npm install -g nodemon

//Instalar express, qerencia as requisições, rotase URLs, entre outras funcionalidades
npm install --save express

//Instalar sequelize
npm install --save sequelize

//Instalar Mysql2
npm install --save mysql2

//Instalar EJS
npm install --save ejs

//Instalar Body-parser
npm install --save body-parser

//Instalar bootstrap
npm install bootstrap@5.3.2


//Criação de tabela relacionadas com Mysql
create table pacientes (
    id_paciente int not null primary key auto_increment,
    nome varchar(50),
    cpf varchar(50),
    rg varchar(50),
    data_nascimento date,
    sexo varchar(50),
    peso varchar(50),
    altura varchar(50),
    telefone varchar(50),
    celular varchar(50),
    email varchar(50),
    endereco varchar(50),
    numero varchar(50),
    complemento varchar(50),
    bairro varchar(50),
    cidade varchar(50),
    estado varchar(50),
    cep varchar(50)
);

create table exames (
    id int not null primary key auto_increment,
    paciente_id int,
    tipo_exame varchar(50),
    nome_exame varchar(50),
    data_exame date,
    data_entrega date,
    convenio varchar(50),
    medico varchar(50),
    comentario varchar(50)
);

alter table exames add constraint foreign key (paciente_id) references pacientes(id_paciente) ON DELETE CASCADE;
