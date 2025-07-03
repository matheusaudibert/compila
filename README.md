# compila

🦄 The next unicorn

## Rodando com Docker (Recomendado)

Para garantir um ambiente seguro e isolado, a aplicação deve ser executada dentro de um contêiner Docker.

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado.

### Como Executar

1.  **Construa a imagem Docker:**

    ```bash
    docker build -t compila-judge .
    ```

2.  **Inicie o contêiner:**

    Este comando irá iniciar o servidor na porta 3000 e montar os diretórios locais `problems` e `submissions` no contêiner.

    ```bash
    docker run --rm -it -p 3000:3000 \
      -v ./problems:/app/problems:ro \
      -v ./submissions:/app/submissions \
      --name compila-server \
      compila-judge
    ```

    - `--rm`: Remove o contêiner quando ele é parado.
    - `-it`: Permite que você veja os logs do servidor no terminal.
    - `-p 3000:3000`: Mapeia a porta 3000 do seu computador para a porta 3000 do contêiner.
    - `-v`: Monta um volume. Usamos para que o contêiner possa ler os problemas e salvar as submissões no seu computador.

3.  **Teste a aplicação:**

    Com o servidor rodando, execute o script `fetch.js` em outro terminal para enviar uma submissão.

    ```bash
    node fetch.js
    ```

### Desenvolvimento Local com Docker

Para desenvolver sem precisar rebuildar a imagem a cada alteração, você pode montar o código-fonte como um volume e usar `nodemon` para reiniciar o servidor automaticamente.

1.  **Construa a imagem Docker (apenas uma vez ou quando o `Dockerfile` mudar)**:

    ```bash
    docker build -t compila-judge .
    ```

2.  **Inicie o contêiner em modo de desenvolvimento**:

    Este comando é diferente do de produção. Ele monta o diretório atual (`.`) em `/app` dentro do contêiner e executa o script `npm run dev`.

    ```bash
    docker run --rm -it -p 3000:3000 \
      -v ./problems:/app/problems:ro \
      -v ./submissions:/app/submissions \
      -v .:/app \
      --name compila-dev-server \
      compila-judge npm run dev
    ```

    Agora, qualquer alteração que você fizer nos arquivos do projeto irá reiniciar o servidor Node.js automaticamente dentro do contêiner.

### Troubleshooting

-   **Erro: `The container name "/compila-server" is already in use`**

    -   **Causa**: Um contêiner com esse nome já existe e não foi removido.
    -   **Solução**: Remova o contêiner antigo antes de iniciar um novo.
      ```bash
      docker rm compila-server
      ```

## Hospedando na Square Cloud

Você pode hospedar esta aplicação gratuitamente na [Square Cloud](https://squarecloud.app).

### Pré-requisitos

-   Ter o projeto em um repositório no [GitHub](https://github.com/).
-   Uma conta na [Square Cloud](https://squarecloud.app).

### Passos para o Deploy

1.  **Envie seu código para o GitHub**: Faça o commit e push de todos os arquivos, incluindo o `Dockerfile` e o `squarecloud.app`, para o seu repositório.

2.  **Acesse o Dashboard da Square Cloud**:
    -   Faça login na sua conta.
    -   Clique em "New Application" ou no botão "+".

3.  **Selecione seu Repositório**:
    -   Escolha a opção "From GitHub".
    -   Selecione o repositório do seu projeto.

4.  **Confirme e Faça o Deploy**:
    -   A Square Cloud lerá o arquivo `squarecloud.app` e configurará a aplicação automaticamente.
    -   Clique em "Deploy".

A plataforma irá construir a imagem Docker e iniciar sua aplicação. Após alguns instantes, ela estará online e você receberá uma URL para acessá-la.
