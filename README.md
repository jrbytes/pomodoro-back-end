# Back-end GoBarber

Projeto do Bootcamp GoStack. O back-end do GoBarber é responsável pela regra de negócio da aplicação e será consumida pelos clientes web e mobile, API agnóstica de tecnologia. 🧔

## Ferramentas

**TypeORM**: Tecnologia utilizada para comunicar-se com o banco de dados, além disso, a capacidade de criar migrations é essencial para a criação das tabelas do banco dando transparência as ações e evitando problemas futuros ou até mesmo voltar no tempo.

**Postgres**: Banco de dados escolhidos para utilizar na aplicação. Sendo assim, algumas informações da migrations do ORM são específicas para o Postgres.

**Token**: Foi utilizado o `jsonwebtoken` para gerir a capacidade de autenticação de usuários na aplicação e criar rotas autenticadas. Além disso, a criptografia de senha também com o `bcriptjs`

**Multer**: Utilizado para auxiliar no upload de arquivos. Onde há a importação das imagens dos perfis de usuários.

## Passo-a-passo para executar

1. `git clone <link do repositório>` | Para clonar o repositório
2. `yarn` | Para instalar as dependências do projeto
3. Com o banco de dados instalado, basta configurá-lo conforme o arquivo ormconfigexample.json
4. `yarn dev:server` | Para rodar o projeto


--------------------------------------------

# Recuperação de senha

**RF**

- O usuário poderá recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário poderá resetar a senha dele

**RNF**

- Utilizar mailtrap para testar envios em ambiente de desenvolvimento
- Utilizar o amazon SES para envios em produção
- O envio de e-mail deve acontecer em segundo plano (background job)

**RN**

- Link enviado por e-mail para resetar a senha, deve expirar em 2 horas
- O usuário precisa confirmar a nova senha ao resetar

# Atualização do perfil

**RF**

- O usuário poderá atualizar nome, email e senha

**RN**

- O usuário não pode alterar o e-mail para outro já utilizado
- Para atualizar a senha, o usuário deve informar a senha antiga
- Para atualizar a senha, o usuário precisa confirmar a nova senha

# Painel do prestador

**RF**

- O usuário poderá listar os agendamentos dele de um dia específico
- O usuário poderá receber uma notificação sempre que houver um novo agendamento
- O usuário pdoerá visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia serão armazenados em cache
- As notificações do prestador serão armazenadas no MongoDB
- As notificações do prestador serão enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação terá um status de lida ou não lida para que o prestador possa controlar

# Agendamento de serviços

**RF**

- O usuário poderá listar todos prestadores de serviço cadastrados
- O usuário poderá listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário poderá listar horários disponíveis em um dia específico de um prestador
- O usuário poderá realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores serão armazenadas em cache

**RN**

- Cada agendamento deve durar uma hora
- Os agendamentos estarão disponíveis entre 8h e 18h (Primeiro às 8h e último às 17h)
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo
