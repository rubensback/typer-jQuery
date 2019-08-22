var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo");
var botaoReiniciar = $("#botao-reiniciar");
var frase = $(".frase");

$(function() {
    atualizaFrase();
    contaElementos();
    reduzTempo();
    inicializaMarcadores();
    botaoReinicia();
    atualizaPlacar();
    adicionaUsuario();
    frasePopUp();
    
})

function atualizaFrase() {
    var frase = $(".frase").text();
    var qtdPalavras = frase.split(" ").length;  
    $("#qtdPalavras").text(qtdPalavras);
}

function contaElementos(){
    campo.on("input",function() {
        var conteudo = campo.val();
    
        //var conteudoSemEspaco = conteudo.replace(/\S+/,''); //não deixa contar o "espaço" como caracter
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    
        var qtdPalavra = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavra);
    });
}

function reduzTempo(){
    campo.one("focus",function () {
        botaoReiniciar.attr("disabled",true);
        var tempoReduz = tempoInicial;
        var cronometro = setInterval(function () {
            tempoReduz--;
            $("#tempo-digitacao").text(tempoReduz)
            if (tempoReduz < 1) {
                clearInterval(cronometro);   
                finalizaJogo();    
            }
        },1000)
    })
}

function finalizaJogo() {
    campo.attr("disabled",true);
    botaoReiniciar.attr("disabled",false);
    campo.addClass("tempo-termina");
    inserePlacar();
}

function inicializaMarcadores(){
    campo.on("input",function(){
        var digitado = campo.val().toLowerCase(); //lowercase para não ter caseSensitive na comparação
        
        var compara = frase.text().substr(0,digitado.length).toLowerCase(); 
        if(digitado == compara){
            campo.addClass("campo-correto")
            campo.removeClass("campo-errado")
        }else{
            campo.addClass("campo-errado")
            campo.removeClass("campo-correto")
        }
        
        /*Usando outro meio..
        var digitouCorreto = frase.text().startsWith(digitado);
        if(digitouCorreto) {
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado")
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto")
        }*/
        
    });
}
    

function botaoReinicia(){
    botaoReiniciar.on("click",function() {
        campo.val("");
        campo.attr("disabled",false);
        $("#contador-caracteres").text(0);
        $("#contador-palavras").text(0);
        $("#tempo-digitacao").text(tempoInicial);
        reduzTempo();
        campo.removeClass("tempo-termina");
        campo.removeClass("campo-errado");
        campo.removeClass("campo-correto");
    })
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function adicionaUsuario() {
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });
}

function frasePopUp() {
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
}

