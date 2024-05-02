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
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
})

/***************IMPORT DOS ARQUIVOS DE CONTROLLER DE PROJETO****************************** */

const controllerFilmes = require('./controller/controller_filme.js')
const controllerAtor = require('./controller/controller_ator.js')
const controllerDiretor = require('./controller/controller_diretor.js')
const controllerNacionalidade = require('./controller/controller_nacionalidade.js')
const controllerSexo = require('./controller/controller_sexo.js')


//Criando um objeto para ontrolar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()

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

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){
    //recebe o contente-type da requisição
    let contentType = request.headers['content-type']


    
    //recebe todos os daoos encaminhados na requisição pelo body
    let dadosBody = request.body


    //encaminha os dados para o controller enviar para DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

app.delete('/v2/acmefilmes/filme/:id', cors(), async (request, response, next)=>{

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
    
  
})

app.put('/v2/acmefilmes/filme/:id', cors(), bodyParserJSON, async function(request,response,next){
    let idFilme = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dadosFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})





//*********************************************************************************************GENERO*********************************************************************************************//

app.get('/v3/acmefilmes/genero/:id', cors(), async function(request, response, next){


    //recebe o ID da requisição
    let idGenero = request.params.id


    //encaminha o ID para a controller buscar o filme
    let dadosGenero = await controllerFilmes.getBuscarGeneroId(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.post('/v3/acmefilmes/genero', cors(), bodyParserJSON, async function(request, response){
    //recebe o contente-type da requisição
    let contentType = request.headers['content-type']


    
    //recebe todos os daoos encaminhados na requisição pelo body
    let dadosBody = request.body


    //encaminha os dados para o controller enviar para DAO
    let resultDadosNovoGenero = await controllerFilmes.setNovoGenero(dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)

    response.json(resultDadosNovoGenero)
})

app.delete('/v3/acmefilmes/genero/:id', cors(), async (request, response, next)=>{

    let idGenero = request.params.id

    let dadosGenero = await controllerFilmes.setExcluirFilme(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
    
  
})

app.put('/v3/acmefilmes/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    let idGenero = request.params.id

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoGenero = await controllerFilmes.setAtualizarGenero(idGenero,dadosBody,contentType)

    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

app.get('/v3/acmefilmes/generos', cors(), async function (_request, response) {
    let dadosGeneros = await controllerFilmes.getListarGeneros()

    response.json(dadosGeneros)
    response.status(200)
})

// app.get('/v3/acmefilmes/genero', cors(), async function(request, response){


//     //recebe o ID da requisição
//     let nome = request.query.nome


//     //encaminha o ID para a controller buscar o filme
//     let dadosGenero = await controllerFilmes.getNomeGenero(nome)

//     response.status(dadosGenero.status_code)
//     response.json(dadosGenero)
// })



//*********************************************************************************************CLASSIFICACAO*********************************************************************************************//



/*******************************************classificacao************************************************************** */

app.get('/v3/acmefilmes/classificacoes', cors(), async function (_request, response) {
        let dadosClassificacao = await controllerFilmes.getListarClassificacoes()
    
        response.json(dadosClassificacao)
        response.status(200)
})

app.get('/v3/acmefilmes/classificacao/:id', cors(), async function(request, response, next){


    //recebe o ID da requisição
    let idClassificacao = request.params.id


    //encaminha o ID para a controller buscar o filme
    let dadosClassificacao = await controllerFilmes.getBuscarClassificacaoID(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.post('/v3/acmefilmes/classificacao', cors(), bodyParserJSON, async function(request, response){
    //recebe o contente-type da requisição
    let contentType = request.headers['content-type']


    
    //recebe todos os daoos encaminhados na requisição pelo body
    let dadosBody = request.body


    //encaminha os dados para o controller enviar para DAO
    let resultDadosNovaClassificacao = await controllerFilmes.setInserirNovaClassificacao(dadosBody, contentType)
    response.status(resultDadosNovaClassificacao.status_code)

    response.json(resultDadosNovaClassificacao)
})

app.put('/v3/acmefilmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerFilmes.setAtualizarClassificacao(idClassificacao, dadosBody, contentType)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.delete('/v3/acmefilmes/classificacao/:id', cors(), async (request, response, next)=>{

    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerFilmes.setExcluirClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
    
  
})


/*******************************************Nacionalidade************************************************************** */
app.get('/v3/acmefilmes/nacionalidades', cors(),async function (_request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosNacionalidade = await controllerNacionalidade.setListarNacionalidade();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosNacionalidade){
        response.json(dadosNacionalidade);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});

app.get('/v3/acmefilmes/nacionalidade/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idNacionalidade = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosNacionalidade = await controllerNacionalidade.setListarNacionalidadeById(idNacionalidade);

    response.status(dadosNacionalidade.status_code);
    response.json(dadosNacionalidade);
})


/*******************************************ATOR************************************************************** */
app.get('/v3/acmefilmes/atores', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosAtor = await controllerAtor.setListarAtor()

    // validação para retornar o Json dos filmes ou retornar o erro 404;
   response.status(dadosAtor.status_code)
   response.json(dadosAtor)
});

app.get('/v3/acmefilmes/atores/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idAtor = request.params.id

    //encaminha o id para a acontroller buscar o Ator
    let dadosAtor = await controllerAtor.setListarAtorById(idAtor)

    response.status(dadosAtor.status_code);
    response.json(dadosAtor);
})

app.delete('/v3/acmefilmes/deleteAtor/:id', cors (), async function (request,response,next){

    let idAtor = request.params.id

    let dadosAtor = await controllerAtor.setExcluirAtor(idAtor)

    response.status(dadosAtor.status_code);
    response.json(dadosAtor)
})

app.post('/v3/acmefilmes/atores', cors(), bodyParserJSON, async function (request, response){

    // recebe o ContentType com os tipos de dados encaminhados na requisição
    let contentType = request.headers['content-type'];

    // vou receber o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoAtor = await controllerAtor.setInserirAtor(dadosBody, contentType)
    console.log(resultDadosNovoAtor);


    response.json(resultDadosNovoAtor);

})

app.put('/v3/acmefilmes/updateAtor/:id', cors(), bodyParserJSON, async function(request,response,next){

    let idAtor = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUptadeAtor = await controllerAtor.setAtualizarAtor(idAtor, dadosBody, contentType);

    
    response.status(resultUptadeAtor.status_code)
    response.json(resultUptadeAtor)

})

/*******************************************sexo************************************************************** */
app.get('/v3/acmefilmes/sexo', cors(),async function (_request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosSexo = await controllerSexo.setListarSexo();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosSexo){
        response.json(dadosSexo);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});

app.get('/v3/acmefilmes/sexo/:id', cors(), async function(request,response){

    // recebe o id da requisição
    let idSexo = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosSexo = await controllerSexo.setListarSexoById(idSexo)

    response.status(dadosSexo.status_code)
    response.json(dadosSexo)
})



/*******************************************DIRETOR************************************************************** */
app.get('/v3/acmefilmes/diretores', cors(),async function (_request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosDiretor = await controllerDiretor.setListarDiretor()

    // validação para retornar o Json dos filmes ou retornar o erro 404;
   response.status(dadosDiretor.status_code)
   response.json(dadosDiretor)
});

app.get('/v3/acmefilmes/diretores/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idDiretor = request.params.id

    //encaminha o id para a acontroller buscar o Ator
    let dadosDiretor = await controllerDiretor.setListarDiretorById(idDiretor)

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);
})

app.delete('/v3/acmefilmes/diretores/:id', cors (), async function (request,response,next){

    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretor.setExcluirDiretor(idDiretor)

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor)
})




app.listen('8080', function () {
    console.log('API FUNCIONANDO');
});