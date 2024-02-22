/**************************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de Filme
 * Data: 01/02/2024
 * Autora: Vitória
 * Versão: 1.0
 */

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo responsável pela 
const filmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme
const setInserirNovoFilme = async function(){

}

//Função para atualizar um filme
const setAtualizarFilme = async function(){

}

//Função para excluir um filme
const setExcluirFilme = async function(){

}


//Função para retornar todos ps filmes
const getListarFilmes = async function(){

    let filmesJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosFilmes = await filmesDAO.selectAllFilme()


    //Validação para verificar se o DAO retornou dados
    if(dadosFilmes){

        //cria o JSON
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        return filmesJSON
    }else{
        return false
    }
}


//Função para buscar um filme
const getBuscarFilmes = async function(id){


    //recebe o id do filme
    let idFilme = id

    //cria o objeto JSON
    let filmeJSON = {}


    //Validação para verificar se o id é válido (vazio, indefinido e não numerico)
    if(id == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID//400
    }else{

        //Encaminha para o DAO localizar o ID do filme
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)


        //Validação para verificar se existem dados de retorno
        if(dadosFilme){

            if(dadosFilme.length > 0){

            //cria o JSON de retorno
            filmeJSON.filme = dadosFilme
            filmeJSON.status_code = 200

            return filmeJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
        return message.ERROR_INTERNAL_SERVER_DB//500
    }
    }

}

const getNomeFilme = async function(nome){

    let nomeFilme = nome
    let filmeJSON = {}

    if(nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID_ID//400
    }else{
      
        let dadosFilme = await filmesDAO.selectByNomeFilme(nomeFilme)
    
        if(dadosFilme){

            if(dadosFilme.length > 0){

            filmeJSON.filme = dadosFilme
            filmeJSON.status_code = 200

            return filmeJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
        return message.ERROR_INTERNAL_SERVER_DB//500
    }
    }

   

}




module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmes,
    getNomeFilme


}