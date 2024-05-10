//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instância da classe prisma client
const prisma = new PrismaClient()

//Função para inserir um novo Diretor no Banco de Dados
const insertDiretor = async function (dadosDiretor) {

    let sql

    try {

        if (dadosDiretor.data_falecimento != '' &&
            dadosDiretor.data_falecimento != null &&
            dadosDiretor.data_falecimento != undefined
        ) {

            sql = `insert into tbl_diretor (   nome,
                                            data_nascimento,
                                            data_falecimento,
                                            biografia,
                                            foto
            ) values (
                                            '${dadosDiretor.nome}',
                                            '${dadosDiretor.data_nascimento}',
                                            '${dadosDiretor.data_falecimento}',
                                            '${dadosDiretor.biografia}',
                                            '${dadosDiretor.foto}'
            )`

        } else {
            sql = `insert into tbl_diretor (   nome,
                                            data_nascimento,
                                            data_falecimento,
                                            biografia,
                                            foto
            ) values (
                                            '${dadosDiretor.nome}',
                                            '${dadosDiretor.data_nascimento}',
                                            null,
                                            '${dadosDiretor.biografia}',
                                            '${dadosDiretor.foto}'
            )`
        }

        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para atualizar um Diretor no Banco de Dados
const updateDiretor = async function (id, dadoAtualizado) {
    let sql

    try {
        if (
            dadoAtualizado.data_falecimento != '' &&
            dadoAtualizado.data_falecimento != null &&
            dadoAtualizado.data_falecimento != undefined
        ) {
            sql = `update tbl_diretor set 
                                        nome = "${dadoAtualizado.nome}",
                                        data_nascimento = '${dadoAtualizado.data_nascimento}',
                                        data_falecimento = '${dadoAtualizado.data_falecimento}',
                                        biografia = '${dadoAtualizado.biografia}',
                                        foto = '${dadoAtualizado.foto}'
                                        where
                                        id_diretor = ${id}`
        } else {
            sql = `update tbl_diretor set 
                                        nome = "${dadoAtualizado.nome}",
                                        data_nascimento = '${dadoAtualizado.data_nascimento}',
                                        biografia = '${dadoAtualizado.biografia}',
                                        foto = '${dadoAtualizado.foto}'
                                        where
                                        id_diretor = ${id}`
        }

        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir um Diretor no Banco de Dados
const deleteDiretor = async function (id) {
    try {
        const sql = `delete from tbl_diretor where id_diretor = ${id}`;
        let rsDiretor = await prisma.$executeRawUnsafe(sql);
        return rsDiretor;
    } catch (error) {
        return false;
    }
};

//Função para listar todos os Diretores do Banco de Dados
const selectAllDiretores = async function () {

    let sql = 'select * from tbl_diretor'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_Diretor')
    let rsDiretores = await prisma.$queryRawUnsafe(sql)

    if (rsDiretores.length > 0)
        return rsDiretores
    else
        return false
}

//Função para buscar um Diretores do Banco de Dados pelo ID
const selectByIdDiretor = async function (id) {

    try {

        //ScriptSQL para buscar um Diretor pelo ID
        let sql = `select * from tbl_diretor where id_diretor=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor

    } catch (error) {

        return false
    }

}






module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    
}
