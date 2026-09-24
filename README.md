## Justificativa da Arquitetura

Para este projeto, optou-se pelo uso de **JavaScript Vanilla, HTML5 e CSS3 puros**.

- **Adequação ao escopo:** Trata-se de uma aplicação de página única com poucas interações dinâmicas.
- **Foco em IHC e UX:** O CSS customizado permitiu controle total sobre responsividade e microinterações de feedback sem sobressaltos de estilos legados.
- **Manutenibilidade do Código:** A manipulação direta do DOM estruturada em funções puras atende aos princípios de responsabilidade única e previsibilidade sem requerer dependências externas.

---

## Requisitos e Funcionalidades

### Funcionais Implementados

- [x] **Adicionar Itens:** Cadastro de produtos com limite de caracteres e tratamento de espaços vazios.
- [x] **Marcar / Desmarcar Comprado:** Separação dinâmica entre itens pendentes e concluídos com feedback de risco.
- [x] **Editar Item:** Ajuste de nome via modal de edição.
- [x] **Remover Item:** Exclusão individual com confirmação prévia para prevenção de erros.
- [x] **Persistência de Dados:** Salvamento automático no `localStorage` do navegador.
- [x] **Layout Responsivo:** Adaptação do layout para telas mobile via Media Queries.
- [x] **Contador de Quantidade:** Indicador dinâmico exibindo o total de itens, pendentes e comprados.
- [x] **Validação de Entrada:** Restrição que impede o cadastro de apenas números ou entradas não textuais.

---

---

## Princípios de IHC Aplicados

1. **Prevenção de Erros:**
   - Validação antes do cadastro impedindo nomes vazios ou itens duplicados.
   - Caixa de confirmação antes de deletar definitivamente qualquer registro.
2. **Affordance e Significantes:**
   - Botões com cores semânticas (Verde = Salvar/Concluir, Vermelho = Excluir/Cancelar, Azul = Ação Principal/Editar).
   - Emojis visuais nos botões sugerindo a ação correspondente (➕, ✏️, ✖️, ↩️).
3. **Feedback e Visibilidade de Estado:**
   - Mensagens claras de erro em vermelho logo abaixo do formulário quando ocorre falha de validação.
   - Alteração visual imediata (fundo verde e texto riscado) ao marcar um item como comprado.
4. **Redução da Carga Cognitiva:**
   - Separação em duas listas distintas ("Itens para Comprar" e "Já Comprados").
