const { application } = require('express')
const nacionalidadeDAO = require('../model/DAO/nacionalidade')
const sexoDAO = require('../model/DAO/sexo.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
const { join } = require('@prisma/client/runtime/library.js')
const { json } = require('body-parser')

const getListarNacionalidades = async function(){
    let nacionalidadesJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosNacionalidade = await nacionalidadeDAO.selectAllNacionalidades()


    //Validação para verificar se o DAO retornou dados
    if(dadosNacionalidade){

        //cria o JSON
        nacionalidadesJSON.nacionalidades = dadosNacionalidade
        nacionalidadesJSON.quantidade = dadosNacionalidade.length
        nacionalidadesJSON.status_code = 200

        return nacionalidadesJSON
    }else{
        return false
    }
}

const getBuscarNacionalidadeId = async function (id){
     
    let idNacionalidade = id
    let nacionalidadeJSON = {}

    if (idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade)) {
        return message.ERROR_INVALID_ID//400
    }
    else {
        let dadosNacionalidade = await nacionalidadeDAO.selectByIdNacionalidades(idNacionalidade)
        if (dadosNacionalidade) {
            if (dadosNacionalidade.length > 0) {
                nacionalidadeJSON.Nacionalidade = dadosNacionalidade
                nacionalidadeJSON.status_code = 200
                return nacionalidadeJSON
            } else {
                return message.ERROR_NOT_FOUND//404
            }
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB//500
        }
    }

}

module.exports = {
    getListarNacionalidades,
    getBuscarNacionalidadeId
}

