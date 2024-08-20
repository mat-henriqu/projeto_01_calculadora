
# 🧮 Calculadora React + Vite + ESLint 🚀

Bem-vindo ao projeto **Calculadora React**! Esta calculadora foi desenvolvida utilizando React, Vite e diversas bibliotecas para oferecer uma experiência de cálculo avançada e intuitiva.

## 🛠️ Tecnologias Utilizadas

- **Vite** - Build tool ultrarrápida ⚡
- **React** - Biblioteca para construção de interfaces de usuário 🖼️
- **JavaScript** - Linguagem de programação utilizada 📝
- **ESLint** - Ferramenta para identificar e corrigir problemas no código 🔍
- **mathjs** - Biblioteca para cálculos matemáticos avançados ➕
- **styled-components** - Biblioteca para estilização de componentes 💅

## 📦 Instalação

Para rodar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/mat-henriqu/projeto_01_calculadora.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd projeto_01_calculadora
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## ⚙️ Configuração do ESLint

Se você estiver desenvolvendo uma aplicação para produção, recomendamos expandir a configuração do ESLint para habilitar regras de linting com reconhecimento de tipos.

1. Configure a propriedade `parserOptions` no nível superior assim:
   ```js
   export default {
     // outras regras...
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       project: ['./tsconfig.json', './tsconfig.node.json'],
       tsconfigRootDir: __dirname,
     },
   }
   ```

2. Substitua `plugin:@typescript-eslint/recommended` por `plugin:@typescript-eslint/recommended-type-checked` ou `plugin:@typescript-eslint/strict-type-checked`.
3. Opcionalmente, adicione `plugin:@typescript-eslint/stylistic-type-checked`.
4. Instale o [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) e adicione `plugin:react/recommended` & `plugin:react/jsx-runtime` à lista de `extends`.

## 🚀 Funcionalidades

- 🔢 **Cálculos Básicos**: Suporte para adição, subtração, multiplicação e divisão.
- 🔢 **Funções Avançadas**: Suporte para exponenciação, raízes quadradas e funções matemáticas adicionais.
- 🧮 **Manipulação de Expressões**: Suporte para parênteses e operações matemáticas complexas.
- 📜 **Histórico de Cálculos**: Armazena e exibe uma lista de cálculos anteriores.
- 🚫 **Gerenciamento de Erros**: Mensagens de erro claras para expressões inválidas.

## 🖥️ Demonstração

Você pode conferir a aplicação rodando em [link-da-aplicacao](https://mat-henriqu.github.io/projeto_01_calculadora/).

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

1. Faça um _fork_ do projeto
2. Crie uma nova branch (`git checkout -b feature/nome-da-feature`)
3. Faça suas alterações e _commit_ (`git commit -m 'Adiciona nova feature'`)
4. Envie para a branch (`git push origin feature/nome-da-feature`)
5. Abra um _pull request_

---

Feito com 💙 por [Matheus Henrique](https://github.com/mat-henriqu/) 🚀
