var idDados = require('../modulo/filmes.js');

const listarFilmes = () => {
    const filmes = idDados.filmes.filmes;
    let filmesARRAY = [];

    filmes.forEach((filme) => {
        let filmeJSON = {
            id: filme.id,
            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento,
            data_relancamento: filme.data_relancamento,
            foto_capa: filme.foto_capa,
            valor_unitario: filme.valor_unitario
        };

        filmesARRAY.push(filmeJSON);
    });

    return filmesARRAY;
}
const idFilmes = (idFilme) => {

    const filmes = idDados.filmes.filmes

    let jsonFilmes = {}
    let id = idFilme,
        situacao = false

    filmes.forEach((filme) => {
        if (filme.id == id) {
            jsonFilmes = {
                id: filme.id,
                nome: filme.nome,
            }
            situacao = true
        }
    })

    if (situacao) return jsonFilmes
    else return false

}

//console.log(listarFilmes());
//console.log(idFilmes(3))


module.exports = {
   listarFilmes,
   idFilmes,

  }