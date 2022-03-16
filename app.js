'use strict';



/**se nada tiver no localStorage, pegar o array vazio (esse (??) é tipo if  */
/**pra poder pegar, temos que transforma ele em array com ( parse)*/
const getBanco = () =>  JSON.parse( localStorage.getItem ('todoList')) ?? [];
/**para poder enviar este dado pro localStorage, temos que transforma ele em uma string */
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

const criarItem = (tarefa, status, indice) => {
  /**aqui ta criando um elemento html */
  const item = document.createElement('label')
  /**Aqui, ta adicionando um a class nele */
  item.classList.add('todo__item');

  /**Vamos colocar alguns item dentro nesse elemento */
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X"  data-indice=${indice}>
  `
  /**vai adiciona um elemento DOM */
  document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
  const todoList = document.getElementById('todoList');
  /**enquantro existir o primeiro filho, esse (while) vai remover o ultimo filho do todoList até sobra nenhum  */
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

const atualizarTela = () => {
  /**vai limpar as tarefas antes de atualizar */
  limparTarefas();
  /**vamos colocar a função getBanco dentro do variavel banco */
  const banco = getBanco();
  /**Ele vai percorrer todo o array, item a item e passar esse elemento para (item) e o (item) vai passar para o (CriarItem) e o criarItem vai pegar dentro do (banco) as tarefas e os status e criar um elemento com esses items  */
  banco.forEach( (item, indice) => criarItem (item.tarefa, item.status, indice));
} 

const inserirItem = (evento) => {
  const tecla = evento.key;
  /**vai pegar o que foi digitado na caxinha  */
  const texto = evento.target.value;

  if (tecla === 'Enter') {
    const banco = getBanco()
    /**vai adicionar um elemento no array, esse elemento vai ficar por ultimo */
    banco.push({'tarefa': texto, 'status': ''})
    setBanco(banco)
    atualizarTela();
    /**vai limpar a caixinha quando apertar a tecla enter */
    evento.target.value = '';
  }
}

const removeItem = (indice) => {
  const banco = getBanco();
  /**vai remover o item do banco, o item que foi clicado */
  banco.splice (indice, 1);
  setBanco(banco)
  /**assim que ele remover, vai atualizar a tela  */
  atualizarTela()
}

const atualizarItem = (indice) => {
  const banco = getBanco()
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  setBanco(banco)
  atualizarTela()
}

const clickItem = (evento) => {
  const elemento = evento.target;
  /**se o tipo do elemento for um botão, vai deletar o indice */
  if (elemento.type === 'button') {
    /**vai pegar o data do elemento  */
    const indice = elemento.dataset.indice;
    removeItem(indice)
  }else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice;
    atualizarItem(indice)
  }
}

/**criando um evento keypress */
document.getElementById('newItem').addEventListener('keypress', inserirItem);
/**criando um evento click */
document.getElementById('todoList').addEventListener('click', clickItem)



atualizarTela()