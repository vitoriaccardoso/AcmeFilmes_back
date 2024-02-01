const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET');
    app.use(cors())
    
    next();
})

app.get('/v1/acmefilmes/filmes', cors(), async function (request, response, next){
//http://localhost:8080/v1/acmefilmes/filmes

    let controleListarFilmes = require('./controller/funcoes')
    let listarFilmes = controleListarFilmes.listarFilmes()

    response.json(listarFilmes)
    response.status(200)
})


app.get('/v1/acmefilmes/:id', cors(), async (request, response, next) => {
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

app.listen('8080', function () {
    console.log('API FUNCIONANDO');
});