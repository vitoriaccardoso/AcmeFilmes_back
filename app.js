/*****************************
 * Objtivo: Arquivo para realizar as requisições de filmes
 * Data: 30/01/2024
 * Autora: Vitória 
 * Versão: 1.0
 */


/****************************************
 * Para realizar a integração com o Banco e Dados devemos utilizar uma das seguintes bibliotecas
 *      -SEQUELIZE                     -É a biblioteca mais antiga
 *      -PRISMA ORM                    -É a biblioteca mais atual (Utilizamos no projeto)
 *      -FASTFY ORM                    -É a biblioteca mais atual
 * 
 * 
 *      Para instalação do PRISMA ORM
 *      npm install prisma --save             (É responsável pela conexão com o BD)
 *      npm install @prisma/client --save     (É responsável por executar scripts SQL no BD)
 *       Para iniciar prisma no projeto, devemos:
 *          npx prisma init
 */





const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use((_request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET');
    app.use(cors())
    
    next();
})

/***************IMPORT DOS ARQUIVOS DE CONTROLLER DE PROJETO****************************** */

const controllerFilmes = require('./controller/controller_filme.js')

//EndPoint: Versão 1.0 - retorna os dados de um arquivo de filmes
//Periodo de utilização 01/2024 até 02/2024
app.get('/v1/acmefilmes/filmes', cors(), async function (_request, response, _next){
//http://localhost:8080/v1/acmefilmes/filmes

    let controleListarFilmes = require('./controller/funcoes')
    let listarFilmes = controleListarFilmes.listarFilmes()

    response.json(listarFilmes)
    response.status(200)
})


app.get('/v1/acmefilmes/:id', cors(), async (request, response, _next) => {
    // http://localhost:8080/v1/acmefilmes/:1
    let idFilme = request.params.id

    
    let controleListarFilmes = require('./controller/funcoes')
    let filme = controleListarFilmes.idFilmes(idFilme)

    if (filme) {
        response.json(filme)
        response.status(200)
    } else {
        response.status(404).send('Filme não encontrado');
    }
})


//EndPoint: Versão 2.0 - retorna os dados de filme do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(_request,response){

    let dadosFilmes = await controllerFilmes.getListarFilmes()

    //Validação para verificar se existem dados a serem retornados
    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

//EndPoint: Retorna os dados filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){


    //recebe o ID da requisição
    let idFilme = request.params.id


    //encaminha o ID para a controller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilmes(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.get('/v2/acmefilmes/filme', cors(), async function(request, response){


    //recebe o ID da requisição
    let nome = request.query.nome


    //encaminha o ID para a controller buscar o filme
    let dadosFilme = await controllerFilmes.getNomeFilme(nome)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})


app.listen('8080', function () {
    console.log('API FUNCIONANDO');
});