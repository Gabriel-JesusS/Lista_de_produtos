

class Produtos {

    static numeroItensLista = 0;

    constructor() {
        this.id = 0.1;
        this.arrayProduto = [];
        this.editId = null;
        this.total = 0;
    }

    salvar() {
        // a variavel produto e atribuida ao metodo lerDados que contem as informaçoes dos inputs
        let produto = this.lerDados();
        if (this.verificarDados(produto)) {
            if (this.editId == null) {
                this.numeroItensLista(Produtos.numeroItensLista += 1);
                this.adicionar(produto);

            } else {
                this.atualizarEdicao(this.editId, produto);
            }
        }

        this.cancelar();
        this.criarLsta(produto);

    }


    //verifica se os Dados estão corretos;
    verificarDados(produto) {
        let verificador = true;
        if (produto.nomeProduto == '') document.querySelector('#labelNome').style.color = "red", verificador = false;
        if (produto.preco == '' || produto.preco.length >= 13) document.querySelector('#labelpreco').style.color = "red", verificador = false;

        if (verificador != true) return false;

        document.querySelector('#labelNome').style.color = "";
        document.querySelector('#labelpreco').style.color = "";
        return true;
    }

    //adiciona os dados dos produtos no final da array
    adicionar(produto) {
        this.id++
        this.arrayProduto.push(produto);
        this.valorTotalDoPrecoProduto();

    }

    criarLsta() {
        //deixa a tag tbody/corpo da lista vazia para nao duplicar as celulas
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayProduto.length; i++) {

            let linhaTr = tbody.insertRow();
            let celula_id = linhaTr.insertCell();
            let celula_img = linhaTr.insertCell();
            let celula_produto = linhaTr.insertCell();
            let celula_valor = linhaTr.insertCell();
            let celula_excluir = linhaTr.insertCell();
            let celula_editar = linhaTr.insertCell();

            celula_id.textContent = this.arrayProduto[i].id;
            celula_img.src = this.arrayProduto[i].img;
            celula_produto.textContent = this.arrayProduto[i].nomeProduto
            celula_valor.textContent = this.arrayProduto[i].preco;


            //area do codigo do icone de delete  
            let excluir = document.createElement('img');
            excluir.src = "src/imgs/lixeira.png";
            excluir.style.height = "30px";
            excluir.style.width = "30px"
            celula_excluir.appendChild(excluir);
            //damos um atributo "click" ao icone passando a array de id
            excluir.setAttribute('onclick', `produto.excluir(${this.arrayProduto[i].id})`);

            //area do codigo do icone de editar 
            let editar = document.createElement('img');
            editar.src = 'src/imgs/ferramenta-lapis.png';
            celula_editar.appendChild(editar);
            //damos um atributo "click" ao icone passando a array full
            celula_editar.setAttribute('onclick', `produto.editar(${JSON.stringify(this.arrayProduto[i])})`);

            //area da imagens adicionadas a lista
            let imgs = document.createElement('img');
            imgs.src = celula_img.src;


            //verificar se a imagem foi adicionada se nao foi, ela adiciona uma imagem de (sem imagem)
            if (celula_img.src == '') imgs.src = 'https://decathlonpro.vtexassets.com/arquivos/ids/2446149/no-image.jpg?v=637140178423230000';
            celula_img.appendChild(imgs);
            //esse metodo pega a variavel imgs para ser enviada para outra pagina;
            this.enviarLink(imgs);


            //estilo padrão para tag tr da tabela para centralização da imagem;
            celula_img.style.width = "66px";
            editar.style.width = '30px';
            editar.style.height = '30px';

        }


    }

    enviarLink(imgs) {
        //localStorage guarda os dados no navegador, setItem cria um obejto e adiciona propriedades como o JSON
        localStorage.setItem("imgs", JSON.stringify(imgs.src));
        imgs.addEventListener('click', () => { window.open("src/fullImagens.html", "_blank") });
    }

    //atualiza o total dos precos quando algun item e excluido
    atulizarTotalDosPrecos(arrayLenght) {
        if (arrayLenght == 0) document.querySelector('#totalPreco').textContent = this.total = 0;
        for (let i = 0; i < this.arrayProduto.length; i++) {
            document.querySelector('#totalPreco').textContent = this.total = this.arrayProduto[i].preco;
        }
    }

    //verifica o id onde os dados foram editados e os atualiza 
    atualizarEdicao(id, produto) {
        for (let i = 0; i < this.arrayProduto.length; i++) {
            if (this.arrayProduto[i].id == id) {
                this.arrayProduto[i].nomeProduto = produto.nomeProduto;
                this.arrayProduto[i].preco = produto.preco;
                document.querySelector('#atualizar').textContent = 'Salvar';
                this.editId = null;
            }

        }
    }

    //edita os itens da lista mandando os dados de volta para os inputs
    editar(dadosDosProdutos) {
        this.editId = dadosDosProdutos.id
        document.querySelector('#produto').value = dadosDosProdutos.nomeProduto
        document.querySelector('#preco').value = dadosDosProdutos.preco
        document.querySelector('#atualizar').textContent = 'Atualizar'

    }

    //excluir e um metodo que pega o id do produto pela array e o deleta
    excluir(id) {
        let tbody = document.querySelector('tbody');
        for (let i = 0; i < this.arrayProduto.length; i++) {
            if (this.arrayProduto[i].id == id) {
                this.arrayProduto.splice(i, 1);
                tbody.deleteRow(i);


                //exluir a quantidade de produtos;
                const excluirNumeroDeItens = Produtos.numeroItensLista -= 1;
                const span = document.querySelector('#quantidadeDeItens');
                span.innerHTML = excluirNumeroDeItens;

                this.atulizarTotalDosPrecos(this.arrayProduto.length);
            }

        }

    }

    valorTotalDoPrecoProduto() {
        this.total = 0;
        for (let i = 0; i < this.arrayProduto.length; i++) {
            this.total += Number(this.arrayProduto[i].preco);
        }
        document.querySelector('#totalPreco').textContent = this.total;
    }


    cancelar() {
        document.querySelector('#preco').value = '';
        document.querySelector('#produto').value = '';
   
    }

    //lerDados cria um objeto produto onde vão estar armazenados os dados mostrados no codigo;
    lerDados() {
        let produto = {}
        produto.id = this.id;
        produto.img = document.querySelector('#img').value;
        produto.preco = document.querySelector('#preco').value;
        produto.nomeProduto = document.querySelector('#produto').value;

        console.log(typeof (produto.preco))
        return produto;
    }


    //metodo para verificar a quantidade de produtos na lista;
    numeroItensLista(quantidade) {
        const span = document.querySelector('#quantidadeDeItens');
        span.innerHTML = quantidade;

    }

}

var produto = new Produtos()



