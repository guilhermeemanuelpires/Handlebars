const BaseUrl = 'http://localhost:3000/';

function mostrarSenha(tipo, btn) {

    var tipo = document.getElementById(tipo);
    var btnTipo = document.getElementById(btn);
    $("#" + btn).removeAttr('class');

    //GAMBI DUS GURI GERENTE SEU VIADO!
    if (tipo.type == "password") {

        tipo.type = "text";

        btnTipo.classList.add("btn");
        btnTipo.classList.add("btn-outline-danger");
        btnTipo.classList.add("fa");
        btnTipo.classList.add("fa-eye");

    } else {
        tipo.type = "password";
        btnTipo.classList.add("btn");
        btnTipo.classList.add("btn-outline-success");
        btnTipo.classList.add("fa");
        btnTipo.classList.add("fa-eye");
    }
}

function ValidaPassWord(password, password2) {

    var s1 = document.getElementById(password).value;
    var s2 = document.getElementById(password2).value;

    if (s1 !== s2) {
        alert('Senhas não conferem!');
        return false;
    } else {
        return true;
    }
}

function editar() {
    document.getElementById('btnSalvar').disabled = false;
    document.getElementById('bntEditar').disabled = true;
    document.getElementById('fone').disabled = false;
}