var botaoFrase = $("#botao-frase");
var botaoId = $("#botao-frase-id");

botaoFrase.on("click",fraseAleatória);
botaoId.on("click",buscaFrase);

function fraseAleatória() {
    $(".spinner").toggle();
    $.get('http://localhost:3000/frases',trocaFraseAleatoria)
    .fail(function () {
        $("#erro").show();
        setTimeout(function () {
            $("#erro").fadeOut();
        },1500)
    })
    .always(function () {
        $(".spinner").toggle();
    })
}

function trocaFraseAleatoria(retorno) {
    var indice = Math.floor(Math.random() * retorno.length) //floor -arredondar
    var fraseAleatoria = retorno[indice];
    console.log(fraseAleatoria);
    
    $(".frase").text(fraseAleatoria.texto); //.texto = propriedade texto = frase esta como propriedade texto
    $("#tempo-digitacao").text(fraseAleatoria.tempo)//.tempo = propriedade tempo

    atualizaTempoInicial(fraseAleatoria.tempo);
    atualizaFrase();
}

function buscaFrase() {
    $(".spinner").toggle();
    var fraseId = $("#frase-id").val();

    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId}; 

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
    },2000);
    })
    .always(function(){
        $(".spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaFrase();
    atualizaTempoInicial(data.tempo);
}