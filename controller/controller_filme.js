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
const setInserirNovoFilme = async function (dadosFilme, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoFilmeJSON = {}

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa > 200 ||
                dadosFilme.valor_unitario.length > 6
            ) {
                return message.ERROR_REQUIRED_FIELDS//400
            }
            else {
                let validateStatus = false
                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS//400
                    }
                    else {
                        validateStatus = true
                    }
                }
                else {
                    validateStatus = true
                }
                if (validateStatus) {
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    if (novoFilme) {
                        let ultimoID = await filmesDAO.getIDFilme()
                        dadosFilme.id = Number(ultimoID[0].id)

                        novoFilmeJSON.filme = dadosFilme
                        novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                        novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                        novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message//201    
                        return novoFilmeJSON
                    }
                    else {
                        return message.ERROR_INTERNAL_SERVER_DB//500
                    }
                }
            }
        }
        else {
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER//500-erro na controller
    }
    
}


//Função para atualizar um filme
const setAtualizarFilme = async function(id, dadosBody, contentType){

    try{
        let idFilme = id

        if(idFilme == '' || idFilme == undefined || idFilme==isNaN(idFilme)){
            return message.ERROR_INVALID_ID
            
        }else{

            if(String(contentType).toLowerCase()== 'application/json'){
                let updateFilmeJson = {}
                let dadosFilme = dadosBody



                if(dadosFilme.nome == ''                  || dadosFilme.nome == undefined               ||  dadosFilme.nome == null               || dadosFilme.nome.length > 80             || 
                dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined            ||  dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000       ||
                dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined            ||  dadosFilme.duracao ==  null           || dadosFilme.duracao.length > 8           ||
                dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined    ||  dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined          ||  dadosFilme.foto_capa ==  null         || dadosFilme.foto_capa.length > 200       ||
                dadosFilme.valor_unitario.length > 6      
                ){
                    return message.ERROR_REQUIRE_FIELDS
                } else {
                    let validateStatus = false

            if (dadosFilme.data_relancamento != null &&
                dadosFilme.data_relancamento != '' &&
                dadosFilme.data_relancamento != undefined){

                if (dadosFilme.data_relancamento.length != 10){
                    return message.ERROR_REQUIRE_FIELDS
                }else{
                    validateStatus = true
                }
            } else {
                validateStatus = true 
            }                   


            let filmeById = await filmesDAO.selectByIdFilme(id)
            if(filmeById.length > 0){

                if (validateStatus){
                    let uptadeFilme = await filmesDAO.updateFilme(id,dadosFilme)

                    if(uptadeFilme){
                        
                        updateFilmeJson.filme = dadosFilme
                        updateFilmeJson.status = message.SUCESS_UPDATE_ITEM.status
                        updateFilmeJson.status_code = message.SUCESS_UPDATE_ITEM.status_code
                        updateFilmeJson.message = message.SUCESS_UPDATE_ITEM.message
                      

                        return updateFilmeJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                console.log("coisa")

                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


//Função para excluir um filme
const setExcluirFilme = async function(id){
    let idFilme = id

    if(idFilme == '' || idFilme == undefined || isNaN(idFilme) || idFilme == null){
       return message.ERROR_INVALID_ID 
       
}else{
    let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)
    let confirmarId = dadosFilme.length
   

    if (confirmarId > 0 ) {
        dadosFilme = await filmesDAO.deleteFilme(idFilme)

        return message.SUCCESS_DELETED_ITEM
    } else {
        return message.ERROR_NOT_FOUND
    }
}

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
        console.log(dadosFilme)

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



/*******************************************GENERO************************************************************** */
const getBuscarGeneroId = async function(id){
    //recebe o id do filme
    let idGenero = id

    //cria o objeto JSON
    let generoJSON = {}


    //Validação para verificar se o id é válido (vazio, indefinido e não numerico)
    if(id == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID//400
    }else{
        
        //Encaminha para o DAO localizar o ID do filme
        let dadosGenero = await filmesDAO.selectGeneroById(idGenero)
        

        //Validação para verificar se existem dados de retorno
        if(dadosGenero){

            if(dadosGenero.length > 0){

            //cria o JSON de retorno
           generoJSON.filme = dadosGenero
            generoJSON.status_code = 200

            return generoJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
        return message.ERROR_INTERNAL_SERVER_DB//500
    }
    }
}

const setNovoGenero = async function(dadosGenero, contentType){

try {
    if (String(contentType).toLowerCase() == 'application/json') {

        let novoGeneroJSON = {}

        if (dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 80 ) {
            return message.ERROR_REQUIRE_FIELDS//400
        }
     
            else {
                validateStatus = true
            }
            if (validateStatus) {
                let novoGenero = await filmesDAO.insertGenero(dadosGenero)
                if (novoGenero) {
                    
                    novoGeneroJSON.nome = dadosGenero
                    novoGeneroJSON.status = message.SUCCESS_CREATED_ITEM.status//201
                    novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code//201
                    novoGeneroJSON.message = message.SUCCESS_CREATED_ITEM.message//201       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                    return novoGeneroJSON
                }
                else {
                    return message.ERROR_INTERNAL_SERVER_DB//500
                }
            }
        
    }
    else {
        return message.ERROR_CONTENT_TYPE//415
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER//500-erro na controller
}

}

const setExcluirGenero = async function (id){
    let idGenero = id

    if(idGenero == '' || idGenero == undefined || isNaN(idGenero) || idGenero == null){
       return message.ERROR_INVALID_ID 
       
}else{
    let dadosGenero = await filmesDAO.selectGeneroById(idGenero)
    let confirmarId = dadosGenero.length
   

    if (confirmarId > 0 ) {
        dadosGenero = await filmesDAO.deleteGenero(idGenero)

        return message.SUCCESS_DELETED_ITEM
    } else {
        return message.ERROR_NOT_FOUND
    }
}
}

const setAtualizarGenero = async function(id, dadosBody, contentType){

    try{
        let idGenero = id

        if(idGenero == '' || idGenero == undefined || idGenero ==isNaN(idGenero)){
            return message.ERROR_INVALID_ID
            
        }else{

            if(String(contentType).toLowerCase()== 'application/json'){
                let updateGeneroJson = {}
                let dadosGenero = dadosBody


                console.log(dadosGenero);
                if(dadosGenero.nome == ''|| dadosGenero.nome == undefined ||  dadosGenero.nome == null || dadosGenero.nome.length > 80  ){

                    return message.ERROR_REQUIRE_FIELDS
                } else {
                    let validateStatus = false

console.log(selectGeneroById);
            let generoById = await filmesDAO.selectGeneroById(id)
            if(generoById.length > 0){

                if (validateStatus){
                    let uptadeGenero = await filmesDAO.updateGenero(id,dadosGenero)

                    if(uptadeGenero){
                        
                        updateGeneroJson.nome = dadosGenero
                        updateGeneroJson.status = message.SUCESS_UPDATE_ITEM.status
                        updateGeneroJson.status_code = message.SUCESS_UPDATE_ITEM.status_code
                        updateGeneroJson.message = message.SUCESS_UPDATE_ITEM.message
                      
                        console.log(updateGeneroJson)

                        return updateGeneroJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
               

                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}



module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmes,
    getNomeFilme,

/*******************************************GENERO************************************************************** */
   getBuscarGeneroId,
   setNovoGenero,
   setExcluirGenero,
   setAtualizarGenero


}