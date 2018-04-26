$(function () {
    Listar();
});

function LimparFormulario() {
    //Limpar formulario
    //pega todos os itens do form e limpa os campos
    $('#formDados').each(function () {
        this.reset();
    });
}

//Recebe a classe css para o tipo, seja sucesso ou erro.
// passamos como parâmetro SUCCESS(para sucesso) ou DANGER(para erro),
//conforme o bootstrap
function Mensagem(stringCss, mensagem) {
    //caso exista uma mensagem, ele remove
    $("#mensagem").remove();

    //serve para limitar um tempo para aparecer a nova mensagem
    setTimeout(function () {
        //serve este passo pode não ser a melhor abortagem,
        //fazemos assim, para que tenha uma familharidade maior com o JQuery.
        $('#formDados').append("<div class='alert alert-" + stringCss + "' id=mensagem role=alert>" + mensagem + "</div>");
    }, 10);
}

function Cadastrar() {
    var dadosSerializados = $('#formDados').serialize();
    $.ajax({
        type: "POST",
        url: "/App/Cadastrar",
        data: dadosSerializados,
        success: function () {
            Listar();
            Mensagem("success", "Cadastrado com Sucesso!");
        },
        error: function () {
            Mensagem("danger", "Erro ao cadastrar!");
        }
    });
}

function Listar() {
    //chamamos nosso método auxiliar para limpar os campos
    LimparFormulario();
    $.ajax({
        type: "GET",
        url: "/App/Listar",
        success: function (dadosPessoa) {
            if (dadosPessoa.length == 0) {
                $('table').addClass('hidden');
            } else {
                $('table').removeClass('hidden');
                debugger;
                $('#tbody').children().remove();
                $(dadosPessoa).each(function (i) {
                    var dataMiliSegundos = dadosPessoa[i].DataNascimento.replace('/Date(', '').replace(')/', '');
                    var dataNascimento = new Date(parseInt(dataMiliSegundos)).toLocaleDateString();
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + dadosPessoa[i].Id;
                    tr += "<td>" + dadosPessoa[i].Nome;
                    tr += "<td>" + dataNascimento;
                    tr += "<td>" + dadosPessoa[i].Email;
                    tr += "<td>" + "<button class='btn btn-info' onclick=Editar(" + dadosPessoa[i].Id + ")>" + "Editar";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=Deletar(" + dadosPessoa[i].Id + ")>" + "Deletar";
                    tbody.append(tr);
                });
            }
        }
    });
}

function Deletar(idPessoa) {
    var confirmar = confirm("Deseja Realmente Apagar ?");
    if (confirmar) {
        $.ajax({
            type: 'POST',
            url: "/App/Deletar",
            data: { id: idPessoa },
            success: function () {
                Listar();
                Mensagem("success", "Deletado com sucesso!");
            },
            error: function () {
                Mensagem("danger", "Erro ao Deletar!");
            }
        });
    }
}

function Editar(idPessoa) {
    $.ajax({
        type: 'GET',
        url: '/App/Editar',

        //informamos que nossa controler possui um parametro com nome 'id'
        // e enviamos o nosso id que pegamos no botao editar.
        data: { id: idPessoa },
        success: function (dados) {
            // faz a formatacao novamente da data que vem do C# em formado JSON
            var dataMiliSegundos = dados.DataNascimento.replace('/Date(', '').replace(')/', '');

            //converte para a data em formato local
            var dataFormatoLocal = new Date(parseInt(dataMiliSegundos)).toLocaleDateString();

            //como nosso atributo TYPE DATE do HTML
            //suporta o somente o formato yyyy-mm-dd (ano-mes-dia)
            //faremos a formatacao do mesmo.
            var dataFormatada = "";

            //com o metodo SUBSTRING do JAVASCRIPT, pegamos os Indexes da string. no exemplo
            //10-01-12 - a substring inicia-se em 0 entao,
            //se queremos pegar o valor apenas do dia, será de
            //0 a 2 pois no primeiro parametro informamos o indice e no segundo a posicao do valor

            dataFormatada += dataFormatoLocal.substring(6, 10) + '-';
            dataFormatada += dataFormatoLocal.substring(3, 5) + '-';
            dataFormatada += dataFormatoLocal.substring(0, 2);

            //após voltar os dados do nosso backend, ele insere estes valores
            //no input de cada item
            $('#idPessoa').val(dados.Id);
            $('#nome').val(dados.Nome);
            $('#DataNascimento').val(dataFormatada);
            $('#Email').val(dados.Email);

            //como queremos EDITAR um determinado contato, ocultaremos o botao SALVAR
            //e mostraremos o botao ATUALIZAR usando a funcao do JQUERY
            $("#salvar").addClass("hidden");
            $("#atualizar").removeClass("hidden");
        }
    });
}

function Atualizar() {
    //recebemos novamente nosso formulário
    var dadosSerializados = $('#formDados').serialize();
    $.ajax({
        type: "POST",
        url: "/App/Atualizar",

        //repare, nosso método de cadastrar é parecido até aqui.
        //nossa controller receberá os dados de acordo com o atributo name
        //de cada propriedade
        data: dadosSerializados,
        success: function () {
            //depois que ocorrer toda a operação com sucesso
            //ocultaremos o botao atualizar e mostraremos novamente o de salvar
            $("#salvar").removeClass("hidden");
            $("#atualizar").addClass("hidden");

            //por fim, listamos os arquivos novamente.
            Listar();
        },

        error: function myfunction() {
            alert("Erro!");
        }
    });
}