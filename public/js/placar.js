var botaoPlacar = $("#botao-placar");
var placar = $(".placar");
var botaoEnvia = $("#botao-sync");

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody")
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").on("click",removeLinha);

    corpoTabela.append(linha);
    placar.slideDown(600);
    scrollPlacar();
}

function novaLinha(usuario,numPalavras){
    var linha = $("<tr>")
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover")
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Ícone dentro do <a>
    link.append(icone);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault(); //para nao acontecer evento padrão de localizar o href quando aperta

    var linha = $(this).parent().parent(); //pai do pai de quem chama a função
    console.log(linha);
    
    linha.fadeOut(800);
    setTimeout(function () {
        linha.remove();
    },800)
}

botaoPlacar.on("click",mostraPlacar);

function mostraPlacar() {
    placar.stop().slideToggle(600);
}

function scrollPlacar() {    
    var posPlacar = placar.offset().top;
    
    var body = $("body");

    $("html").animate(
    {
        scrollTop: posPlacar + "px"
    },1600);
}

botaoEnvia.on("click",sincronizaPlacar);

function sincronizaPlacar() {
    
    var placar = [];
    var linha = $("tbody>tr");

    linha.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var score = {
            usuario: usuario,
            pontos: palavras
        }

        placar.push(score);
    })

    var dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar",dados,function () {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open"); 
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
    }).always(function(){ 
        setTimeout(function() {
        $(".tooltip").tooltipster("close"); 
    }, 1200);
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}

