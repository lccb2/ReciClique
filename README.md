# ReciClique
Projeto da Disciplina de Integração e Evolução dos Sistemas de Informação da UFPE


-------------------
# ♻️ ReciClique

ReciClique é uma plataforma colaborativa que incentiva a **reutilização criativa de materiais recicláveis**, permitindo que usuários encontrem inspiração com base nos materiais que já possuem em casa.

---

## 🚀 Funcionalidades principais

- Cadastro e login de usuários
- Edição de perfil com imagem, nome e bio
- Publicação de projetos criativos com fotos e descrições
- Publicação de tutoriais dos projetos através de hiperlink para o youtube
- Curtidas e comentários nas postagens
- **Busca inteligente por material** (ex: "garrafa pet", "papelão")
- Galeria pessoal com histórico de criações daquele usuário

---

## 🧱 Arquitetura do sistema

O projeto será construido com **arquitetura de microserviços**, onde cada funcionalidade principal é gerenciada por um serviço independente, ou seja, dividindo as funções em módulos.

```plaintext
reciclique/
├── aut-service/        # Autenticação
├── user-service/       # Perfis de usuário
├── publi-service/      # Postagens e uploads
├── coment-service/     # Comentários e curtidas
├── pesq-service/       # Filtragem por material
├── pag-service/        # Galeria personalizada
├── frontend/           # Interface em HTML + JS
├── gateway/            # API Gateway
├── docker-compose.yml  # Execução integrada
└── README.md
