# ONG Solidária

Site institucional desenvolvido para a **ONG Solidária**, com o objetivo de apresentar a organização, seus projetos e disponibilizar um formulário para cadastro de pessoas interessadas em atuar como voluntárias.

O projeto foi desenvolvido utilizando **HTML5 semântico, CSS3 e JavaScript**, priorizando organização estrutural, acessibilidade, responsividade e separação de responsabilidades entre estrutura, apresentação e comportamento.

## 📋 Sobre o projeto

A **ONG Solidária** é um projeto web voltado à apresentação de iniciativas sociais e ao engajamento de voluntários.

O site possui três páginas principais:

- **Início** — apresentação institucional da ONG e sua missão;
- **Projetos** — apresentação das campanhas e iniciativas desenvolvidas;
- **Seja voluntário** — formulário para cadastro de pessoas interessadas em participar das ações da organização.

A navegação é realizada por meio de links convencionais entre documentos HTML independentes.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura e marcação semântica;
- **CSS3** — estilização, layout e responsividade;
- **JavaScript** — interatividade e validações do formulário;
- **Git/GitHub** — versionamento e disponibilização do projeto.

## 📁 Estrutura do projeto

```text
/Projeto ONG
│
├── css/
│   └── style.css
│
├── img/
│   ├── logo-ong.png
│   ├── image-ong-index.png
│   └── image-ong-projetos.png
│
├── js/
│   └── formulario.js
│   └── menu-mobile.js
│
├── cadastro.html
├── index.html
└── projetos.html
```

### `index.html`

Página inicial do projeto.

Apresenta a identidade da ONG, sua missão e os principais valores relacionados às iniciativas sociais, como inclusão, educação e fortalecimento da comunidade.

Também disponibiliza uma chamada para que o visitante possa demonstrar interesse em participar das ações da organização.

### `projetos.html`

Página destinada à apresentação das iniciativas da ONG.

Entre os projetos apresentados estão:

- **Alimento para Todos**;
- **Educação Solidária**;
- **Comunidade em Ação**.

A página também possui uma chamada para o cadastro de novos voluntários.

### `cadastro.html`

Página destinada ao cadastro de voluntários.

O formulário é organizado semanticamente utilizando elementos como `form`, `fieldset`, `legend`, `label`, `input`, `select` e `textarea`.

Os campos incluem dados pessoais, endereço e área de interesse voluntário.

Também são utilizados recursos de validação nativa do HTML5, como:

- `required`;
- `minlength`;
- `maxlength`;
- `type="email"`;
- `pattern`.

### `css/style.css`

Arquivo responsável pela apresentação visual do projeto.

Ele centraliza os estilos utilizados pelas páginas, permitindo manter uma identidade visual consistente em todo o site.

Entre suas responsabilidades estão:

- tipografia;
- cores;
- espaçamentos;
- componentes;
- navegação;
- formulários;
- botões;
- cards;
- organização dos conteúdos;
- responsividade.

### `img/`

Diretório destinado aos recursos gráficos utilizados pelo site.

Entre os arquivos estão o logotipo da ONG e imagens utilizadas nas páginas institucionais.

As imagens possuem atributos `alt` para fornecer uma descrição textual e contribuir para a acessibilidade.

### `js/formulario.js`

Arquivo JavaScript responsável pela interatividade do formulário de cadastro.

Entre suas funcionalidades estão:

- aplicação de máscaras para CPF, telefone e CEP;
- validação específica dos campos;
- apresentação de mensagens de erro;
- manipulação de classes CSS para indicar campos inválidos;
- utilização da API de validação dos formulários HTML5;
- apresentação de mensagens de sucesso ou erro.

O JavaScript trabalha em conjunto com a validação nativa do HTML5, não substituindo os mecanismos de validação definidos no formulário.

## 🧩 Validação do formulário

O formulário utiliza uma combinação de **validação nativa do HTML5** e validações complementares em JavaScript.

Por exemplo, o CPF utiliza `pattern` para exigir o formato:

```text
000.000.000-00
```

O telefone utiliza:

```text
(00) 00000-0000
```

E o CEP utiliza:

```text
00000-000
```

Além disso, o JavaScript realiza verificações específicas, como a validação matemática dos dígitos verificadores do CPF.

As máscaras são aplicadas dinamicamente enquanto o usuário preenche os campos.

## ♿ Acessibilidade

O projeto utiliza recursos do HTML5 voltados à acessibilidade, incluindo:

- estrutura semântica;
- elementos `header`, `nav`, `main`, `section`, `article` e `footer`;
- associação entre `label` e campos de formulário;
- textos alternativos com `alt` nas imagens;
- indicação da página atual com `aria-current="page"`;
- utilização de `aria-describedby` para mensagens relacionadas aos campos;
- utilização de `role="alert"` e `aria-live` para mensagens do formulário.

Esses recursos ajudam a tornar a navegação e a compreensão do conteúdo mais adequadas para diferentes usuários e tecnologias assistivas.

## 🧱 Organização técnica

O projeto utiliza uma separação de responsabilidades:

```text
HTML       → Estrutura e conteúdo
CSS        → Apresentação visual
JavaScript → Interatividade e validações
IMG        → Recursos gráficos
```

Essa organização facilita a manutenção do código e permite que alterações em estilos, imagens ou funcionalidades sejam realizadas sem concentrar todas as responsabilidades nos documentos HTML.

## 🔀 Navegação

A aplicação utiliza uma arquitetura **multipágina (MPA)**.

As páginas são documentos HTML independentes e a navegação ocorre por meio de links tradicionais:

```html
<a href="index.html">Início</a>
<a href="projetos.html">Projetos</a>
<a href="cadastro.html">Seja voluntário</a>
```

Portanto, o projeto **não utiliza atualmente um roteador JavaScript de Single Page Application (SPA)**. O JavaScript existente é utilizado principalmente para a manipulação do DOM e para as funcionalidades do formulário.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/adrianolara-gif/Projeto-ONG.git
```

### 2. Entre no diretório

```bash
cd projeto-ong
```

### 3. Execute o projeto

Como o projeto utiliza HTML, CSS e JavaScript no lado do cliente, pode ser aberto diretamente no navegador.

A página inicial é:

```text
index.html
```

Para uma experiência de desenvolvimento mais prática, também pode ser utilizado um servidor local, como a extensão **Live Server** do Visual Studio Code.

## 🖥️ Compatibilidade

O projeto foi desenvolvido utilizando tecnologias padrão da Web e pode ser executado em navegadores modernos que ofereçam suporte a HTML5, CSS3 e JavaScript.

## 📚 Objetivos acadêmicos

O projeto foi desenvolvido como exercício prático de desenvolvimento web, contemplando conceitos como:

- HTML5 semântico;
- organização de diretórios;
- acessibilidade;
- formulários HTML5;
- validação de dados;
- manipulação do DOM;
- JavaScript;
- CSS responsivo;
- separação de responsabilidades;
- organização de um projeto para versionamento com Git e GitHub.

## 📌 Status do projeto

**Em desenvolvimento / projeto acadêmico.**

Novas funcionalidades, melhorias de acessibilidade, aprimoramentos visuais e integrações com backend podem ser adicionados futuramente.

## 👤 Autor

**Adriano Lara**

Projeto acadêmico — **ONG Solidária**.
