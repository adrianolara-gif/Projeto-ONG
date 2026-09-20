"use strict";

const formulario = document.querySelector("#formularioCadastro");
const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const cep = document.querySelector("#cep");

const erroCpf = document.querySelector("#erroCpf");
const erroTelefone = document.querySelector("#erroTelefone");
const erroCep = document.querySelector("#erroCep");

const mensagemFormulario = document.querySelector("#mensagemFormulario");

/* Remove tudo que não for número. */
function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}

/* CPF: 000.000.000-00 */
function mascararCPF(valor) {
    let numeros = somenteNumeros(valor).slice(0, 11);

    numeros = numeros.replace(/^(\d{3})(\d)/, "$1.$2");
    numeros = numeros.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    numeros = numeros.replace(
        /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
        "$1.$2.$3-$4"
    );

    return numeros;
}

/* Telefone: (00) 00000-0000 */
function mascararTelefone(valor) {
    let numeros = somenteNumeros(valor).slice(0, 11);

    if (numeros.length <= 2) {
        return numeros.length ? `(${numeros}` : "";
    }

    if (numeros.length <= 7) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

/* CEP: 00000-000 */
function mascararCEP(valor) {
    let numeros = somenteNumeros(valor).slice(0, 8);

    if (numeros.length > 5) {
        return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
    }

    return numeros;
}

/*
 * Validação matemática do CPF.
 * Além do formato, verifica os dois dígitos verificadores.
 */
function cpfValido(valor) {
    const numeros = somenteNumeros(valor);

    if (numeros.length !== 11) {
        return false;
    }

    // Rejeita CPFs compostos pelo mesmo dígito.
    if (/^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(numeros[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(numeros[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(numeros[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === Number(numeros[10]);
}

function telefoneValido(valor) {
    const numeros = somenteNumeros(valor);

    /*
     * Aceita telefone fixo com 10 dígitos ou celular com 11.
     * O primeiro dígito do DDD e o segundo dígito não podem ser zero.
     */
    if (!/^[1-9]{2}/.test(numeros)) {
        return false;
    }

    if (numeros.length === 10) {
        return /^[1-9]{2}[2-5][0-9]{7}$/.test(numeros);
    }

    if (numeros.length === 11) {
        return /^[1-9]{2}9[0-9]{8}$/.test(numeros);
    }

    return false;
}

function cepValido(valor) {
    const numeros = somenteNumeros(valor);

    return /^[0-9]{8}$/.test(numeros);
}

/* Máscaras em tempo real. */
cpf.addEventListener("input", () => {
    cpf.value = mascararCPF(cpf.value);
    cpf.setCustomValidity("");
    erroCpf.textContent = "";
});

telefone.addEventListener("input", () => {
    telefone.value = mascararTelefone(telefone.value);
    telefone.setCustomValidity("");
    erroTelefone.textContent = "";
});

cep.addEventListener("input", () => {
    cep.value = mascararCEP(cep.value);
    cep.setCustomValidity("");
    erroCep.textContent = "";
});

/* Valida CPF ao sair do campo. */
cpf.addEventListener("blur", () => {
    if (!cpf.value) {
        return;
    }

    if (!cpfValido(cpf.value)) {
        cpf.setCustomValidity("Informe um CPF válido.");
        erroCpf.textContent = "CPF inválido.";
        cpf.classList.add("invalido");
    } else {
        cpf.setCustomValidity("");
        erroCpf.textContent = "";
        cpf.classList.remove("invalido");
    }
});

/* Valida telefone ao sair do campo. */
telefone.addEventListener("blur", () => {
    if (!telefone.value) {
        return;
    }

    if (!telefoneValido(telefone.value)) {
        telefone.setCustomValidity("Informe um telefone válido.");
        erroTelefone.textContent = "Telefone inválido.";
        telefone.classList.add("invalido");
    } else {
        telefone.setCustomValidity("");
        erroTelefone.textContent = "";
        telefone.classList.remove("invalido");
    }
});

/* Valida CEP ao sair do campo. */
cep.addEventListener("blur", () => {
    if (!cep.value) {
        return;
    }

    if (!cepValido(cep.value)) {
        cep.setCustomValidity("Informe um CEP válido.");
        erroCep.textContent = "CEP deve possuir 8 números.";
        cep.classList.add("invalido");
    } else {
        cep.setCustomValidity("");
        erroCep.textContent = "";
        cep.classList.remove("invalido");
    }
});

/*
 * Validação geral antes do envio.
 * O formulário continua utilizando a API nativa de validação HTML5.
 */
formulario.addEventListener("submit", (evento) => {
    mensagemFormulario.className = "mensagem-formulario";
    mensagemFormulario.textContent = "";

    // Dispara as validações personalizadas.
    cpf.dispatchEvent(new Event("blur"));
    telefone.dispatchEvent(new Event("blur"));
    cep.dispatchEvent(new Event("blur"));

    if (!formulario.checkValidity()) {
        evento.preventDefault();

        mensagemFormulario.textContent =
            "Verifique os campos destacados antes de enviar o cadastro.";
        mensagemFormulario.classList.add("erro");

        formulario.reportValidity();
        return;
    }

    /*
     * Neste exemplo não existe backend.
     * Em uma aplicação real, os dados devem ser enviados por HTTPS
     * para um servidor que faça nova validação.
     */
    evento.preventDefault();

    mensagemFormulario.textContent =
        "Cadastro preenchido corretamente! Em uma aplicação real, os dados seriam enviados ao servidor.";
    mensagemFormulario.classList.add("sucesso");
});