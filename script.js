let itens = JSON.parse(localStorage.getItem('lista-compras')) || [];

const form = document.getElementById('formulario');
const inputNome = document.getElementById('nome');
const erroMensagem = document.getElementById('erro-mensagem');
const listaPendentes = document.getElementById('lista-pendentes');
const listaComprados = document.getElementById('lista-comprados');
const remocao = document.getElementById("confirmar-remocao");

function salvarDados() {
    localStorage.setItem('lista-compras', JSON.stringify(itens));
}

function adicionarItem(nome) {
    const nomeItem = nome.trim();

    const novoItem = {
        id: Date.now(),
        nome: nomeItem,
        comprado: false
    };

    itens.push(novoItem);
    salvarDados();
    renderizarListas();
    limparFormulario();
}

function alternarStatusItem(id) {
    itens = itens.map(item => {
        if (item.id === id) {
            return { ...item, comprado: !item.comprado };
        }
        return item;
    });
    salvarDados();
    renderizarListas();
}

function deletarItem(id) {
    itens = itens.filter(item => item.id !== id);
    remocao.style.display = "none";
    salvarDados();
    renderizarListas();
}

function limparFormulario() {
    inputNome.value = "";

}

function criarElementoHTML(item) {
    const li = document.createElement('li');
    li.className = `item-lista ${item.comprado ? 'comprado' : '➕'}`;
    li.innerHTML = `
        <div>${item.nome}</div>
        <div class="botao-acao">
        <button class="botao-alternar" onclick="alternarStatusItem(${item.id})" >
            ${item.comprado ? '​​↩️' : '➕'}
        </button>
        
        <button class="botao-deletar" onclick="confirmarRemocao(${item.id})">
            ✖️
            </button>
        </div>
    `;
    return li;
}

function confirmarRemocao(id, nome) {
    remocao.innerHTML = `          
            <h3>Confirmar remoção?</h3>
            <button class="botao-editar" onclick="cancelarRemocao()">Cancelar</button>
            <button class="botao-deletar" onclick="deletarItem(${id})">Sim</button>`;
    remocao.style.display = "flex";
    salvarDados();
    renderizarListas();
}

function cancelarRemocao() {
    remocao.style.display = "none";
}

function renderizarListas() {

    listaPendentes.innerHTML = "";
    listaComprados.innerHTML = "";

    itens.forEach(item => {
        const elementoHTML = criarElementoHTML(item);
        if (item.comprado) {
            listaComprados.appendChild(elementoHTML);
        } else {
            listaPendentes.appendChild(elementoHTML);
        }
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    adicionarItem(inputNome.value);
});
renderizarListas();
