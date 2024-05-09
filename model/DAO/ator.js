
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const insertAtor = async function(dadosAtor){
    let sql

    try {
        if (dadosAtor.data_falecimento && dadosAtor.data_falecimento !== '') {
            sql = `
                INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falecimento, biografia, foto, id_sexo)
                VALUES (
                    "${dadosAtor.nome}",
                    "${dadosAtor.nome_artistico}",
                    "${dadosAtor.data_nascimento}",
                    "${dadosAtor.data_falecimento}",
                    "${dadosAtor.biografia}",
                    "${dadosAtor.foto}",
                    "${dadosAtor.id_sexo}"
                )
            `;
        } else {
            sql = `
                INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falecimento, biografia, foto, id_sexo)
                VALUES (
                    "${dadosAtor.nome}",
                    "${dadosAtor.nome_artistico}",
                    "${dadosAtor.data_nascimento}",
                    NULL,
                    "${dadosAtor.biografia}",
                    "${dadosAtor.foto}",
                    "${dadosAtor.id_sexo}"
                )
            `;
        }

        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql);

        return !!result; // Convertendo para booleano

    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateAtor = async function(dadoAtualizado, idAtor) {
    try{
        let sql
        if(dadoAtualizado.data_falecimento != '' &&
        dadoAtualizado.data_falecimento   != null &&
        dadoAtualizado.data_falecimento   != undefined){
            sql = `update tbl_ator SET 
            nome = '${dadoAtualizado.nome}',
            nome_artistico = '${dadoAtualizado.nome_artistico}',
            data_nascimento = '${dadoAtualizado.data_nascimento}',
            data_falecimento = '${dadoAtualizado.data_falecimento}',
            biografia = '${dadoAtualizado.biografia}',
            foto = '${dadoAtualizado.foto}',
            id_sexo = '${dadoAtualizado.id_sexo}'
            WHERE
           tbl_ator.id_ator = ${idAtor}`
        }else{
            sql = `update tbl_ator SET 
            nome = '${dadoAtualizado.nome}',
            nome_artistico = '${dadoAtualizado.nome_artistico}',
            data_nascimento = '${dadoAtualizado.data_nascimento}',
            biografia = '${dadoAtualizado.biografia}',
            foto = '${dadoAtualizado.foto}',
            id_sexo = '${dadoAtualizado.id_sexo}'
            WHERE
            tbl_ator.id_ator = ${idAtor}`
        }
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result){
           return true
        }else{
           return false
        }
    }catch(error){
        return false
    } 
}

const deleteAtor = async function(id){
    try {
        const sql = `delete from tbl_ator where id_ator = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme

    } catch (error) {
        return false
    }
}


const selectAllAtor = async function(){
    let sql = 'select * from tbl_ator'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    let rsAtor = await prisma.$queryRawUnsafe(sql)

    if(rsAtor.length > 0)
        return rsAtor
    else 
        return false


}

const selectByIdAtor = async function(id){

    //encaminha o script sql par o bd
    try {

        //ScriptSQL para buscar um ator pelo ID
        let sql = `select * from tbl_ator where id_ator=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor

    } catch (error) {

        return false
    }

}

const selectNameAtor = async function(nome){
    try {
        let sql = `select * from tbl_ator where nome like"%${nome}%"`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}



module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtor,
    selectByIdAtor,
    selectNameAtor,
  
}