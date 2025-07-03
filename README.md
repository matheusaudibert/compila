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
