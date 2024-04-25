/******************************************************************
 * Objetivo: Arquivo responsável pela padronização de variáveis e constantes globais do projeto
 * Data: 22/02/2024
 * Autora: Vitória
 * Versão; 1.0
 */



/********************************** IMAGENS DE ERRO DO PROJETO ************************************************/

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!'}

const ERROR_REQUIRE_FIELDS = {status: false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação '}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foi encontrado nenhum item '}

const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um erro no acesso ao banco de dados. Contate o administrador da API '}

const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um problema na camada de negocio/controle da aplicação. Contate o administrador da API '}

const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'O content-type encaminhado na requisição não é suportado. Deve-se encaminhar apenas requisições com application/json'}

/***********************MENSAGENS DE SUCESSO***************************** */
const SUCCESS_CREATED_ITEM = {status: true, status_code:201, message: 'Item criado com sucesso !!'}
const SUCCESS_DELETED_ITEM = {status: true, status_code:200, message: 'Item excluído com sucesso !!'}
const SUCESS_UPDATE_ITEM = {status: true, status_code:200, message: 'Item atualizado com sucesso !!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRE_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCCESS_DELETED_ITEM,
    SUCESS_UPDATE_ITEM
    
}