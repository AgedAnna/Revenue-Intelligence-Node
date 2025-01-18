````md
# Revenue Intelligence

Este projeto integra com o **HubSpot** para obter dados de contatos e gera **lead scores** usando **OpenAI GPT-3.5**. Ele expõe um endpoint `/insights` que retorna uma lista de contatos com pontuação de probabilidade de compra.

## Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Instalação](#instalação)
4. [Uso](#uso)
5. [Estrutura de Pastas](#estrutura-de-pastas)
6. [Screenshots](#screenshots)
7. [Licença](#licença)

## Visão Geral

- **Integração**: com HubSpot para coletar contatos (nome, email, propriedades personalizadas).
- **IA**: utiliza `gpt-3.5-turbo` para analisar engajamento e fornecer pontuação (score) de 0 a 100.
- **API**: endpoint `/insights` retorna JSON com cada contato e seu score.

## Arquitetura

![Diagrama de Arquitetura](/docs/img/arquitetura.png)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/AgedAnna/Revenue-Intelligence-Node
   cd revenue-intelligence
   ```
## Instale as dependências:
   ```bash
   npm install
   Crie o arquivo .env (veja a seção “Variáveis de Ambiente”).
   ```

## Inicie a aplicação:
   ```bash
   npm start
   ```
   A aplicação rodará, por padrão, em http://localhost:3000.
   Acesse GET /insights para ver a lista de contatos com seus respectivos scores.

   Exemplo de resposta:
   {
     "insights": [
       {
         "id": "92402504337",
         "email": "annabeatryz12345@gmail.com",
         "name": "Anna Beatryz",
         "score": 80
       },
       {
         "id": "92416777021",
         "email": "emailmaria@hubspot.com",
         "name": "Maria Johnson",
         "score": 50
       }
     ]
   }

## Estrutura de Pastas
   revenue-intelligence/
    ├─ src/
    │   ├─ controllers/
    │   │   └─ insightsController.js
    │   ├─ services/
    │   │   ├─ hubspotService.js
    │   │   └─ aiService.js
    │   ├─ app.js
    │   └─ server.js
    ├─ .gitignore
    ├─ package.json
    └─ README.md

   controllers/: lida com as rotas e a lógica para cada endpoint.
   services/: contém a lógica de integração com HubSpot (hubspotService) e OpenAI (aiService).

## Variáveis de Ambiente
   Crie um arquivo .env na raiz do projeto (que não deve ser versionado) com os valores adequados:
   
   OPENAI_API_KEY=your_openai_key_here
   HUBSPOT_API_KEY=your_hubspot_token_here
   PORT=3000
   
   OPENAI_API_KEY: Chave gerada no OpenAI Dashboard.
   HUBSPOT_API_KEY: Token de aplicativo privado (Private App) no HubSpot.
   PORT (opcional): Porta onde o servidor deve rodar.

## Endpoints
   GET /insights
   Descrição: Retorna uma lista de contatos do HubSpot com scores calculados pela IA.
   Resposta:
   {
     "insights": [
       { "id": "...", "email": "...", "name": "...", "score": 50 }
     ]
   }

## Erros:
   401 / 403: caso as credenciais da HubSpot estejam inválidas.
   429: se a OpenAI estiver sem cota ou se o limite foi atingido.
   500: erros internos ao processar.

## Contribuição
   Fork este repositório.
   Crie uma branch (git checkout -b minha-feature).
   Faça suas alterações e commit (git commit -m 'Minha feature').
   Faça push para sua branch (git push origin minha-feature).
   Abra um Pull Request no GitHub.

**FIM**

````
