module.exports = function () {
    return stop;
}

function stop(mensagem) {
    console.error(mensagem);
    console.log('Servidor Encerrado');
    process.exit(0);

}