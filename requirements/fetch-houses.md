# Criar imóvel

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/houses**
2. ✅ Valida se a requisição foi feita por um **usuário logado**
5. ✅ Retorna **200** com os dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se o usuário não estiver logado
4. ✅ Retorna erro **500** se der erro ao tentar buscar as casas
