"use strict";

const formulario = document.querySelector("#formularioCadastro");

const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const cep = document.querySelector("#cep");

const erroCpf = document.querySelector("#erroCpf");
const erroTelefone = document.querySelector("#erroTelefone");
const erroCep = document.querySelector("#erroCep");

const mensagemFormulario = document.querySelector("#mensagemFormulario");


/*
 * Remove tudo que não for número.
 */
function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}


/*
 * CPF: 000.000.000-00
 */
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


/*
 * Telefone: (00) 00000-0000
 */
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


/*
 * CEP: 00000-000
 */
function mascararCEP(valor) {
    let numeros = somenteNumeros(valor).slice(0, 8);

    if (numeros.length > 5) {
        return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
    }

    return numeros;
}


/*
 * Validação matemática do CPF.
 *
 * Além de verificar se possui 11 números,
 * verifica os dois dígitos verificadores.
 */
function cpfValido(valor) {
    const numeros = somenteNumeros(valor);

    if (numeros.length !== 11) {
        return false;
    }

    /*
     * Rejeita CPFs compostos pelo mesmo dígito.
     */
    if (/^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    let soma = 0;

    /*
     * Primeiro dígito verificador.
     */
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

    /*
     * Segundo dígito verificador.
     */
    for (let i = 0; i < 10; i++) {
        soma += Number(numeros[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === Number(numeros[10]);
}


/*
 * Validação do telefone.
 *
 * O formulário utiliza o formato:
 * (00) 00000-0000
 *
 * Portanto, são aceitos 11 números:
 * 2 números para o DDD + 9 números para o celular.
 */
function telefoneValido(valor) {
    const numeros = somenteNumeros(valor);

    return /^[1-9]{2}9[0-9]{8}$/.test(numeros);
}


/*
 * Validação do CEP.
 *
 * O formato visual é:
 * 00000-000
 *
 * A validação considera somente os 8 números.
 */
function cepValido(valor) {
    const numeros = somenteNumeros(valor);

    return /^[0-9]{8}$/.test(numeros);
}


/*
 * Máscara do CPF em tempo real.
 */
cpf.addEventListener("input", () => {
    cpf.value = mascararCPF(cpf.value);

    /*
     * Limpa apenas a mensagem personalizada do JavaScript.
     * A validação do pattern continua sendo feita pelo HTML5.
     */
    cpf.setCustomValidity("");

    erroCpf.textContent = "";
    cpf.classList.remove("invalido");
});


/*
 * Máscara do telefone em tempo real.
 */
telefone.addEventListener("input", () => {
    telefone.value = mascararTelefone(telefone.value);

    telefone.setCustomValidity("");

    erroTelefone.textContent = "";
    telefone.classList.remove("invalido");
});


/*
 * Máscara do CEP em tempo real.
 */
cep.addEventListener("input", () => {
    cep.value = mascararCEP(cep.value);

    cep.setCustomValidity("");

    erroCep.textContent = "";
    cep.classList.remove("invalido");
});


/*
 * Valida CPF ao sair do campo.
 */
cpf.addEventListener("blur", () => {
    if (!cpf.value) {
        return;
    }

    /*
     * Primeiro verifica o formato definido pelo HTML5.
     */
    if (!cpf.checkValidity()) {
        cpf.setCustomValidity(
            "Informe o CPF no formato 000.000.000-00."
        );

        erroCpf.textContent =
            "Informe o CPF no formato 000.000.000-00.";

        cpf.classList.add("invalido");

        return;
    }

    /*
     * Depois verifica matematicamente o CPF.
     */
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


/*
 * Valida telefone ao sair do campo.
 */
telefone.addEventListener("blur", () => {
    if (!telefone.value) {
        return;
    }

    /*
     * Verifica primeiro o pattern definido no HTML5.
     */
    if (!telefone.checkValidity()) {
        telefone.setCustomValidity(
            "Informe o telefone no formato (00) 00000-0000."
        );

        erroTelefone.textContent =
            "Informe o telefone no formato (00) 00000-0000.";

        telefone.classList.add("invalido");

        return;
    }

    /*
     * Depois verifica se o telefone possui
     * uma estrutura válida.
     */
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


/*
 * Valida CEP ao sair do campo.
 */
cep.addEventListener("blur", () => {
    if (!cep.value) {
        return;
    }

    /*
     * Verifica primeiro o pattern definido no HTML5.
     */
    if (!cep.checkValidity()) {
        cep.setCustomValidity(
            "Informe o CEP no formato 00000-000."
        );

        erroCep.textContent =
            "Informe o CEP no formato 00000-000.";

        cep.classList.add("invalido");

        return;
    }

    /*
     * Depois verifica se possui exatamente 8 números.
     */
    if (!cepValido(cep.value)) {
        cep.setCustomValidity("Informe um CEP válido.");

        erroCep.textContent =
            "CEP deve possuir 8 números.";

        cep.classList.add("invalido");
    } else {
        cep.setCustomValidity("");

        erroCep.textContent = "";

        cep.classList.remove("invalido");
    }
});


/*
 * Validação geral antes do envio.
 *
 * O formulário utiliza a validação nativa do HTML5.
 */
formulario.addEventListener("submit", (evento) => {

    mensagemFormulario.className = "mensagem-formulario";
    mensagemFormulario.textContent = "";

    /*
     * Executa as validações personalizadas
     * de CPF, telefone e CEP.
     */
    cpf.dispatchEvent(new Event("blur"));
    telefone.dispatchEvent(new Event("blur"));
    cep.dispatchEvent(new Event("blur"));

    /*
     * checkValidity() verifica:
     *
     * - required
     * - minlength
     * - maxlength
     * - type="email"
     * - pattern
     * - setCustomValidity()
     */
    if (!formulario.checkValidity()) {

        evento.preventDefault();

        mensagemFormulario.textContent =
            "Verifique os campos destacados antes de enviar o cadastro.";

        mensagemFormulario.classList.add("erro");

        /*
         * Mostra a mensagem de validação nativa
         * do navegador no primeiro campo inválido.
         */
        formulario.reportValidity();

        return;
    }

    /*
     * Neste exemplo não existe backend.
     *
     * Em uma aplicação real, os dados devem ser enviados
     * por HTTPS para um servidor que faça nova validação.
     */
    evento.preventDefault();

    mensagemFormulario.textContent =
        "Cadastro preenchido corretamente! Em uma aplicação real, os dados seriam enviados ao servidor.";

    mensagemFormulario.classList.add("sucesso");
});
