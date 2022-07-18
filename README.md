# Conduit

## Pré Requisito
 - Ter Instalado o node.js na sua máquina
 - Pode realizar o download através do link: https://nodejs.org/en/download/

## Após ter instalado o nodejs

- 1º: clonar o projeto do github
- 2º: executar o comando "npm install" dentro da pasta clonada, para installar todas as dependências do projeto

## Variáveis de Ambiente 
 - Nesses testes temos conteúdos sensiveis, então a necessidade de criar as variaveis de ambiente
 - Na raiz do projeto, criar o arquivo com o nome: cypress.env.json;
 - Neste arquivo deve ser adicionadas o padrão de estrutura apresentada no arquivo "cypress.env.exemple.txt"

## Exemplo
    {
    "BASE_URL": Deve informar a url do site,
    "NAME": "Deve informar um nome fictício aqui",
    "EMAIL": "Deve ter uma conta criada na plataforma, informar seu email aqui.",
    "PASSWORD": "Informar a senha correta do respectivo email utilizado na plataforma."
    }
    
# Como executar os testes

## Modo Open
     Para acompanhar a execução, no terminal execute o comando:
     - npm run test
   
  - Após alguns segundos o modo open do cypress é exibido, e é só acionar em algum dos testes exibidos.  
    
## Modo Headless
    Para rodar direto no terminal, execute o comando:
    - npm run test:headless
