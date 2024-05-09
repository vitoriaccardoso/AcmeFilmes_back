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


module.exports = {
    selectAllNacionalidades,
    selectByIdNacionalidades,

}
