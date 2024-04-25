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
const insertFilme = async function(dadosFilme){
    
    let sql;
    try {
        if (dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined) {
            sql = `insert into tbl_filme (nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,valor_unitario) 
            values(
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`
        }
        else {
            sql = `insert into tbl_filme (nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,valor_unitario) 
                values(
                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    null,
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}'
                )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}

//Função para atualizar um filme no banco de dados
const updateFilme = async function(id,dadosAtualizados){
    try{

        let sql;

        if (dadosAtualizados.data_relancamento != '' && 
            dadosAtualizados.data_relancamento != null &&
            dadosAtualizados.data_relancamento != undefined
        ){

            sql = `UPDATE tbl_filme SET nome = '${dadosAtualizados.nome}',
                sinopse = '${dadosAtualizados.sinopse}',
                duracao = '${dadosAtualizados.duracao}',
                data_lancamento = '${dadosAtualizados.data_lancamento}',
                data_relancamento = '${dadosAtualizados.data_relancamento}',
                foto_capa = '${dadosAtualizados.foto_capa}',
                valor_unitario  = '${dadosAtualizados.valor_unitario}' 
                where id_filme = ${id} `
        } else {
             sql = `UPDATE tbl_filme SET  nome = '${dadosAtualizados.nome}',
                sinopse = '${dadosAtualizados.sinopse}',
                duracao = '${dadosAtualizados.duracao}',
                data_lancamento = '${dadosAtualizados.data_lancamento}',
                data_relancamento = null,
                foto_capa = '${dadosAtualizados.foto_capa}',
                valor_unitario  = '${dadosAtualizados.valor_unitario}' 
                 where id_filme = ${id}`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        
        return false

    }
}

//Função para excluir um filme no banco de dados
const deleteFilme = async function(id){
    try {
        const sql = `delete from tbl_filme where id_filme = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        
        return rsFilme

    } catch (error) {
        return false
    }



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
        let sql = `select * from tbl_filme where id_filme = ${id}`
    
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme
        
    } catch (error) {
        return false
        
    }

}

//Função para buscar um filme do Banco de Dados pelo nome
const selectByNomeFilme = async function(nome){
    try {
        let sql = `select * from tbl_filme where nome like '%${nome}%'`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
        
    } catch (error) {

        return false
        
    }

    
}



/*******************************************genero************************************************************** */


const selectGeneroById = async function (id) {
    try {
        let sql = `select * from tbl_genero where id_genero = ${id}`
    
        let rsGenero= await prisma.$queryRawUnsafe(sql)
        return rsGenero
        
    } catch (error) {
        return false
        
    }

}

const insertGenero = async function(dadosGenero){
    let sql;
    try {
        
            sql = `insert into tbl_genero (nome) 
            values(
                '${dadosGenero.nome}'
          )`
        
       
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
const deleteGenero = async function(id){
    try {
        const sql = `delete from tbl_genero where id_genero = ${id}`
        let rsGenero = await prisma.$executeRawUnsafe(sql)
        
        return rsGenero

    } catch (error) {
        return false
    }

}

const updateGenero = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_genero
                SET
                    nome = '${dadoAtualizado.nome}'
                WHERE
                    id_genero = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllGenero = async function (){
    let sql = 'select * from tbl_genero'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    if(rsGenero.length > 0)
        return rsGenero
    else 
        return false

}

// const selectByNomeGenero = async function(nome){
//     try {
//         let sql = `select * from tbl_genero where nome like '%${nome}%'`

//         let rsGenero = await prisma.$queryRawUnsafe(sql)

//         return rsGenero
        
//     } catch (error) {

//         return false
        
//     }

    
// }



/*******************************************classificacao************************************************************** */

const selectAllClassificacao = async function(){
    let sql = 'select * from tbl_classificacao'


    let rsClassificacao = await prisma.$queryRawUnsafe(sql)

    if(rsClassificacao.length > 0)
        return rsClassificacao
    else 
        return false

}

const selectClassificacaoByID = async function (id){
    try {
        let sql = `select * from tbl_classificacao where id_classificacao = ${id}`
    
        let rsClassificacao= await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
        
    } catch (error) {
        return false
        
    }

}

const inserirClassificacao = async function (dadosClassificacao){
    let sql;
    try {
        
            sql = `insert into tbl_classificacao(
                faixa_etaria, 
                classificacao, 
                caracteristica, 
                icone) 
            values(
                '${dadosClassificacao.faixa_etaria}',
                '${dadosClassificacao.classificacao}',
                '${dadosClassificacao.caracteristica}',
                '${dadosClassificacao.icone}'
          )`
        
       
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateClassificacao  = async function (id, dadoAtualizado){
    let sql

    try {
        sql = `update tbl_classificacao
         set 
           faixa_etaria = "${dadoAtualizado.faixa_etaria}",
            classificacao = "${dadoAtualizado.classificacao}",
          caracteristica = "${dadoAtualizado.caracteristica}",
           icone = "${dadoAtualizado.icone}"
        where
            id_classificacao = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function (id){
    try {
        const sql = `delete from tbl_classificacao where id_classificacao = ${id}`
        let rsClassificacao = await prisma.$executeRawUnsafe(sql)
        
        return rsClassificacao

    } catch (error) {
        return false
    }
}


/*******************************************Nacionalidade************************************************************** */

// const selectAllNacionalidades = async function (){
//     let sql = 'select * from tbl_nacionalidade'


//     let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

//     if(rsNacionalidade.length > 0)
//         return rsNacionalidade
//     else 
//         return false

// }

// const selectByIdNacionalidades = async function(id){
//     try {
//         let sql = `select * from tbl_nacionalidade where id_nacionalidade =${id}`
//         let rsGenero = await prisma.$queryRawUnsafe(sql)
//         return rsGenero
//     } catch (error) {
//         return false
//     }

// }



    /*******************************************exports************************************************************** */
module.exports = {
    insertFilme,
    updateFilme, 
    deleteFilme,
    selectAllFilme,
    selectByIdFilme,
    selectByNomeFilme,


    /*******************************************genero************************************************************** */

    selectGeneroById,
    insertGenero,
    deleteGenero,
    updateGenero,
    selectAllGenero,
    // selectByNomeGenero




    /*******************************************classificacao************************************************************** */

    selectAllClassificacao,
    selectClassificacaoByID,
    inserirClassificacao,
    updateClassificacao,
    deleteClassificacao,


    // /*******************************************Nacionalidade************************************************************** */
    // selectAllNacionalidades,
    // selectByIdNacionalidades,

    

}