// Import do arquivo responsavel pela interação com DB(model)
const { application } = require('express')
const diretorDAO = require('../model/DAO/diretor.js')
const sexoDAO = require ('../model/DAO/sexo.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidade.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
const { join } = require('@prisma/client/runtime/library.js')
const { json } = require('body-parser')


const setInserirNovoDiretor = async function (dadosDiretor, contentType) {

    try {

        //Validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //Cria o objeto JSON para devolver os dados criados na requisição
            let novoDiretorJSON = {}

            //Validação de campos obrigatórios ou com digitação inválida
            if (dadosDiretor.nome == ''               || dadosDiretor.nome == undefined             || dadosDiretor.nome == null              || dadosDiretor.nome.length > 100             ||
                dadosDiretor.data_nascimento == ''    || dadosDiretor.data_nascimento == undefined  || dadosDiretor.data_nascimento == null   || dadosDiretor.data_nascimento.length != 10  ||
                dadosDiretor.biografia == ''          || dadosDiretor.biografia == undefined        || dadosDiretor.biografia == null         || dadosDiretor.biografia.length > 1000       ||
                dadosDiretor.foto == ''               || dadosDiretor.foto == undefined             || dadosDiretor.foto == null              || dadosDiretor.foto.length > 150
            ) {
                return message.ERROR_REQUIRED_FIELDS //400

            } else {

                let validateStatus = false

                //Validação da data de relançamento, já que ela não é obrigatória no Banco de Dados

                if (dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != '' &&
                    dadosDiretor.data_falecimento != undefined) {

                    //Validação para verificar se a data está com a quantidade de digitos corretos
                    if (dadosDiretor.data_falecimento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //Validação para verificar se a variável booleana é verdadeira
                if (validateStatus) {

                    //Encaminha os dados do Diretor para o DAO inserir no Banco de Dados
                    let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)

                    //Validação para verificar se DAO inseriu os dados do Banco
                    if (novoDiretor) {

                        //Cria o JSON de retorno dos dados (201)
                        novoDiretorJSON.diretor = dadosDiretor
                        novoDiretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoDiretorJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return novoDiretorJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}

//Função para atualizar um novo Diretor
const setAtualizarDiretor = async function (idDiretor, dadoAtualizado, contentType) {
    try {

        // Validação de content-type (apenas aplication/json)
        if (String(contentType).toLowerCase() == 'application/json') {
            let dadosID = diretorDAO.selectByIdDiretor()

            if (idDiretor == '' || idDiretor == undefined || idDiretor == isNaN(idDiretor) || idDiretor == null) {
                return message.ERROR_INVALID_ID
            } else if (idDiretor > dadosID.length) {
                return message.ERROR_NOT_FOUND
            } else {
                // Cria o objeto JSON para devolver os dados criados na requisição
                let atualizarDiretorJSON = {}

                //Validação de campos obrigatórios ou com digitação inválida
                if (dadoAtualizado.nome == ''               || dadoAtualizado.nome == undefined             || dadoAtualizado.nome == null              || dadoAtualizado.nome.length > 100             ||
                    dadoAtualizado.data_nascimento == ''    || dadoAtualizado.data_nascimento == undefined  || dadoAtualizado.data_nascimento == null   || dadoAtualizado.data_nascimento.length != 10  ||
                    dadoAtualizado.biografia == ''          || dadoAtualizado.biografia == undefined        || dadoAtualizado.biografia == null         || dadoAtualizado.biografia.length > 1000       ||
                    dadoAtualizado.foto == ''               || dadoAtualizado.foto == undefined             || dadoAtualizado.foto == null              || dadoAtualizado.foto.length > 150
                ) {              
                    return message.ERROR_REQUIRED_FIELDS
                }

                else {
                    let validateStatus = false

                    // Outra validação com campos obrigatorios ou com digitação inválida
                    if (dadoAtualizado.data_falecimento != null &&
                        dadoAtualizado.data_falecimento != ''   &&
                        dadoAtualizado.data_falecimento != undefined) {
                            console.log("22")

                        if (dadoAtualizado.data_falecimento.length != 10) {
                            return message.ERROR_REQUIRE_FIELDS//400
                        } else {
                            validateStatus = true
                        }
                    } else {

                        validateStatus = true
                    }

                    // Validação para verificar se a variavel booleana é verdadeira
                    if (validateStatus) {
                        console.log("11")

                        // Encaminha os dados do Diretor para o DAO inserir no DB
                        let dadosDiretor = await diretorDAO.updateDiretor(idDiretor, dadoAtualizado)

                        // if(atualizarDiretor){
                        //     let idDiretores = await DiretoresDAO.IDDiretor()
                        //     console.log(idDiretores)
                        //     dadoAtualizado.id = Number(idDiretores[0].id)
                        // }
                        console.log("rsere")

                        // Validação para verificar se o DAO inseriu os dados do DB
                        if (dadosDiretor) {

                            //Cria o JSON de retorno dos dados (201)
                            atualizarDiretorJSON.diretor = dadosDiretor
                            atualizarDiretorJSON.status = message.SUCESS_UPDATE_ITEM.status
                            atualizarDiretorJSON.status_code = message.SUCESS_UPDATE_ITEM.status_code
                            atualizarDiretorJSON.message = message.SUCESS_UPDATE_ITEM.message
                            return atualizarDiretorJSON //201

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    } else {
                        validateStatus = false
                    }
                    console.log("9999")

                }

            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log("0000")
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}

//Função para excluir um novo Diretor
const setExcluirDiretor = async function (id) {
    let idDiretor = id;

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor) || idDiretor == null) {
        return message.ERROR_INVALID_ID;
    } else {
        let dadosDiretor = await diretorDAO.selectByIdDiretor(idDiretor);
        let validarId = dadosDiretor.length;

        if (validarId > 0) {
            dadosDiretor = await diretorDAO.deleteDiretor(idDiretor);
            return message.SUCCESS_DELETED_ITEM;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    }
}

//Função para listar todos os Diretores
const getListarDiretores = async function () {

    //Cria um objeto JSON
    let diretoresJSON = {}

    //Chama a função do DAO que retorna os Diretores do Banco de Dados
    let dadosDiretores = await diretorDAO.selectAllDiretores()

    //Validação para verificar se o DAO retornou dados
    if (dadosDiretores) {
        //Cria o JSON para retornar para o APP
        diretoresJSON.diretores = dadosDiretores
        diretoresJSON.quantidade = dadosDiretores.length
        diretoresJSON.status_code = 200

        return diretoresJSON
    } else {
        return false
    }

}

//Função para buscar um novo Diretor
const getBuscarDiretor = async function (id) {

    //Recebe o ID do Diretor
    let idDiretor = id

    //Cria o objeto JSON
    let diretorJSON = {}

    //Validação para verificar se ID é válido (vazio, indefinido e não numérico)
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha para o DAO localizar o ID do Diretor
        let dadosDiretor = await diretorDAO.selectByIdDiretor(idDiretor)

        //Validação para verificar se existem dados de retorno
        if (dadosDiretor) {

            //Validação para verificar a quantidade de itens encontrados
            if (dadosDiretor.length > 0) {

                //Cria o JSON de retorno
                diretorJSON.diretor = dadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}



module.exports = {
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretor,
    
}