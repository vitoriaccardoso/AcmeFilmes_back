/**************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no Banco de Dados MySQL,
 *      aqui realizamos o CRUD utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autora: Vitória
 * Versão: 1.0
 * 
 */



//Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')



//Instância da classe prisma client 
const prisma = new PrismaClient()





//Função para inserir novo filme no Banco de Dados
const insertFilme = async function(){

}

//Função para atualizar um filme no banco de dados
const updateFilme = async function(){

}

//Função para excluir um filme no banco de dados
const deleteFilme = async function(){

}

//Função para listar todos os filme do banco de dados
const selectAllFilme = async function(){


    let sql = 'select * from tbl_filme'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    if(rsFilmes.length > 0)
        return rsFilmes
    else 
        return false


}

//Função para buscar um filme do Banco de Dados pelo ID
const selectByIdFilme = async function(id){

    //encaminha o script sql par o bd
    try {
        let sql = `select * from tbl_filme where id = ${id}`
    
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme
        
    } catch (error) {
        return false
        
    }

}

const selectByNomeFilme = async function(nome){
    try {
        let sql = `select * from tbl_filme where nome like '%${nome}%'`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
        
    } catch (error) {

        return false
        
    }


}

//Função para buscar um filme do Banco de Dados pelo nome


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectAllFilme,
    selectByIdFilme,
    selectByNomeFilme
}