let itens = JSON.parse(localStorage.getItem("lista-compras")) || [];

const form = document.getElementById("formulario");
const inputNome = document.getElementById("nome");
const erroMensagem = document.getElementById("erro-mensagem");
const listaPendentes = document.getElementById("lista-pendentes");
const listaComprados = document.getElementById("lista-comprados");
const edicao = document.getElementById("editar-item");
const remocao = document.getElementById("confirmar-remocao");

function salvarDados() {
  localStorage.setItem("lista-compras", JSON.stringify(itens));
}

function validarItem(nome) {
  return !itens.some((item) => item.nome === nome);
}

function mostrarMensagemErro(mensagem) {
  erroMensagem.innerHTML = mensagem;
  erroMensagem.style.display = "inline";
}

function adicionarItem(nome) {
  const nomeItem = nome.trim();
  if (!validarItem(nomeItem)) {
    mostrarMensagemErro("Item já existente, forneça um item novo");
    limparFormulario();
    return;
  }
  erroMensagem.style.display = "none";
  const novoItem = {
    id: Date.now(),
    nome: nomeItem,
    comprado: false,
  };

  itens.push(novoItem);
  salvarDados();
  renderizarListas();
  limparFormulario();
}

function alternarStatusItem(id) {
  itens = itens.map((item) => {
    if (item.id === id) {
      return { ...item, comprado: !item.comprado };
    }
    return item;
  });
  salvarDados();
  renderizarListas();
}

function deletarItem(id) {
  itens = itens.filter((item) => item.id !== id);
  remocao.style.display = "none";
  salvarDados();
  renderizarListas();
}

function limparFormulario() {
  inputNome.value = "";
}

function criarElementoHTML(item) {
  const li = document.createElement("li");
  const nome = JSON.stringify(item.nome);
  li.className = `item-lista ${item.comprado ? "comprado" : ""}`;
  li.innerHTML = `
        <div><span>${item.nome}</span></div>
        <div class="botao-acao">
        <button class="botao-alternar" title="${item.comprado ? "Desmarcar como comprado" : "Marcar como comprado"}" onclick="alternarStatusItem(${item.id})" >
            ${item.comprado ? "​​↩️" : "➕"}
        </button>
        <button class="botao-editar" title="Editar item" onclick="mostrarEdicaoItem(${item.id}, '${item.nome}')" >
            ✏️
        </button>
        <button class="botao-deletar"  title="Remover item" onclick="confirmarRemocao(${item.id}, '${item.nome}')">
            ✖️
            </button>
        </div>
    `;
  return li;
}

function mostrarEdicaoItem(id, nome) {
  edicao.innerHTML = `
      <h3>Editando ${nome}</h3>
            <div>
            <label for="nome-novo">Nome do item</label>
            <input 
                    required
                    type="text" 
                    id="nome-novo" 
                    placeholder="Ex: Arroz, Feijão..." 
                   maxlength="30"
                   >
            </div>
                <span id="erro-edicao"></span>
                   <div>
            <button class="botao-deletar" onclick="cancelarEdicao()">Cancelar</button>
            <button class="botao-alternar" onclick="editarItem(${id})">Salvar</button>
            </div>
    `;
  edicao.style.display = "flex";
  remocao.style.display = "none";
}

function editarItem(id) {
  const erroEdicao = document.getElementById("erro-edicao");
  if (document.getElementById("nome-novo").value.trim() === "") {
    mostrarMensagemErroEdicao("O nome do item não pode ser vazio.");
    return;
  }

  if (!validarItem(document.getElementById("nome-novo").value.trim())) {
    mostrarMensagemErroEdicao("Item já existente, forneça um item novo");
    return;
  }
  erroEdicao.style.display = "none";
  edicao.style.display = "none";
  itens.forEach((item) => {
    if (item.id === id) {
      item.nome = document.getElementById("nome-novo").value.trim();
    }
  });
  salvarDados();
  renderizarListas();
}

function mostrarMensagemErroEdicao(mensagem) {
  const erroEdicao = document.getElementById("erro-edicao");
  erroEdicao.innerHTML = mensagem;
  erroEdicao.style.display = "inline";
}

function cancelarEdicao() {
  edicao.style.display = "none";
}

function confirmarRemocao(id, nome) {
  remocao.innerHTML = `          
            <h3>Confirmar remoção de ${nome}?</h3>
            <button class="botao-editar" onclick="cancelarRemocao()">Cancelar</button>
            <button class="botao-deletar" onclick="deletarItem(${id})">Sim</button>`;
  remocao.style.display = "flex";
  edicao.style.display = "none";
}

function cancelarRemocao() {
  remocao.style.display = "none";
}

function renderizarListas() {
  listaPendentes.innerHTML = "";
  listaComprados.innerHTML = "";

  itens.forEach((item) => {
    const elementoHTML = criarElementoHTML(item);
    if (item.comprado) {
      listaComprados.appendChild(elementoHTML);
    } else {
      listaPendentes.appendChild(elementoHTML);
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  adicionarItem(inputNome.value);
});
renderizarListas();
