// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllNacionalidades = async function (){
    let sql = 'select * from tbl_nacionalidade'


    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

    if(rsNacionalidade.length > 0)
        return rsNacionalidade
    else 
        return false

}

const selectByIdNacionalidades = async function(id){
    try {
        let sql = `select * from tbl_nacionalidade where id_nacionalidade =${id}`
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }

}


const selectNacionalidadeAtor = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select n.nome from tbl_ator_nacionalidade as i
        join tbl_nacionalidade as n on i.id_nacionalidade=n.id_nacionalidade
        join tbl_ator as a on i.id_ator=a.id_ator
        where a.id_ator = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

            return rsClassificacao;
    
        } catch (error) {
            return false;
            
        }
}

const selectNacionalidadeDiretor = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select n.nome from tbl_diretor_nacionalidade as i
        join tbl_nacionalidade as n on i.id_nacionalidade=n.id_nacionalidade
        join tbl_diretor as a on i.id_diretor=a.id_diretor
        where a.id_diretor = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

            return rsClassificacao;
    
        } catch (error) {
            return false;
            
        }
}

const selectAtorByNacionalidade = async function(nome){
    try {
        let sql = `
        SELECT tbl_ator.*
        FROM tbl_ator, tbl_ator_nacionalidade, tbl_nacionalidade
        WHERE tbl_ator.id_ator = tbl_ator_nacionalidade.id_ator
        AND tbl_ator_nacionalidade.id_nacionalidade = tbl_nacionalidade.id_nacionalidade
        AND tbl_nacionalidade.nome = '${nome}';`
        console.log(sql)
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    /*******************************************Nacionalidade************************************************************** */
    selectAllNacionalidades,
    selectByIdNacionalidades,
    selectNacionalidadeAtor,
    selectNacionalidadeDiretor,
    selectAtorByNacionalidade
}
