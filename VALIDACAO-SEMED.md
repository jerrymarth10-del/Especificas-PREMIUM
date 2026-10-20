# Validação SEMED e catálogo — 20/10/2026

Branch: `fix/semed-cards-20261020`.

Execute da raiz do repositório: `node scripts/check-catalog.cjs`.
O comando monta a resposta real da função, verifica catálogo e JavaScript e encerra com código diferente de zero quando encontra uma regressão. Não usa credenciais reais nem faz compras.

## Resultado local

- O HEAD original falhou localmente com HTTP 500: `cardLayoutCss is not defined`. CSS estava declarado em buildCuidadorSocial/buildSecretariaEscolar e referenciado fora desse escopo. Corrigido retornando o CSS junto do bundle.
- Montagem corrigida HTTP 200; 30 cards únicos com uma imagem Base64 e um botão cada.
- Cuidador passou pela mesma normalização de catálogo usada nos demais cards. No navegador em produção, a imagem dele tinha 420,5 px de altura versus 304,5 px dos demais: regra de apresentação inconsistente.
- Removida substituição incondicional da arte de Polícia Penal por fallback genérico.
- Professor renomeado para SEMED — Séries Iniciais, mantendo ID, senha, progresso, 45 aulas e 4 aulas IBGP extras.
- Mantidas as 3 páginas PCI já presentes, verificadas em 20/10: Uberaba 2023 Anos Iniciais; Santana do Paraíso 2018 Fundamental I; Uberaba 2023 Educação Infantil (complementar). PCI exige verificação para acesso aos PDFs; URLs de download direto não foram inventadas.
- 46 imagens embutidas da resposta decodificadas sem erro em verificação auxiliar.
- Secretaria não aparece no HTML anônimo como conteúdo liberado; sessão manual sintética válida recebe a seção protegida.

## Limites e publicação

Não houve alteração em checkout, pagamento, credenciais ou regras de compra.
Testes locais de montagem, sintaxe, imagens e invariantes aprovados. Validação visual da nova versão em preview e testes no iPhone ainda pendentes. A inspeção da versão atualmente publicada não equivale a validar a branch nova.
Envio ao GitHub autorizado explicitamente pelo usuário em 20/10/2026, após a revisão automática solicitar confirmação dos destinos. Validação de preview em andamento; nenhum deploy de produção realizado.

Após autorização: enviar a branch, aguardar preview, verificar imagens, botões e navegação em desktop/celular; publicar somente depois da validação.
