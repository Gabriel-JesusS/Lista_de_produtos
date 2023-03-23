

class Produtos {

    static numeroItensLista = 0;

    constructor() {
        this.id = 0.1;
        this.arrayProduto = [];
    }

    salvar() {

        let produto = this.lerDados();
        if (this.verificarDados(produto)) {
            this.adicionar(produto);
            this.numeroItensLista(Produtos.numeroItensLista += 1);
        }

        this.cancelar();
        this.criarLsta(produto);



    }

    criarLsta() {


        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        for (let i = 0; i < this.arrayProduto.length; i++) {

            let tr = tbody.insertRow();
            let td_id = tr.insertCell();
            let td_img = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.textContent = this.arrayProduto[i].id;
            td_img.src = this.arrayProduto[i].img;
            td_produto.textContent = this.arrayProduto[i].nomeProduto;
            td_valor.textContent = this.arrayProduto[i].preco;

            //area do codigo de exclusao dos itens da tabela
            let excluir = document.createElement('img');
            excluir.src = "src/lixeira.png";
            excluir.style.height = "20px";
            excluir.style.width = "30px"
            td_acoes.appendChild(excluir);
            excluir.setAttribute('onclick', `produto.excluir(${this.arrayProduto[i].id})`);

            //area da imagens adicionadas a lista
            let imgs = document.createElement('img');
            imgs.src = td_img.src;

            //verificar se a imagem foi adicionada
            if (td_img.src == '') imgs.src = 'https://decathlonpro.vtexassets.com/arquivos/ids/2446149/no-image.jpg?v=637140178423230000';
            td_img.appendChild(imgs);

           
            //estilo padrão para tag tr da tabela centralização da imagem;
            td_img.style.width = "66px";

        }

        

    }


    adicionar(produto) {
        this.id++
        this.arrayProduto.push(produto);
    }

//excluir e um metodo que pega o id do produto pela array e o deleta
    excluir(id) {
        let tbody = document.querySelector('tbody');
        for (let i = 0; i < this.arrayProduto.length; i++) {
            if (this.arrayProduto[i].id == id) {
                this.arrayProduto.splice(i, 1);
                tbody.deleteRow(i)

                //exluir a quantidade de produtos;
                const excluirNumeroDeItens = Produtos.numeroItensLista -= 1;
                const span = document.querySelector('#quantidadeDeItens');
                span.innerHTML = excluirNumeroDeItens;
            }
        }

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
        produto.preco = this.tratarPrecoProdutos(document.querySelector('#preco').value);
        produto.nomeProduto = this.tratarNomesProdutos(document.querySelector('#produto').value);

        return produto;
    }

    tratarPrecoProdutos(precoProduto) {
        return  `R$ ${precoProduto}`;
    }

    tratarNomesProdutos(nomeProduto) {
        return nomeProduto.charAt(0).toUpperCase() + nomeProduto.slice(0);
    }

    //metodo para verificar a quantidade de produtos na lista;
    numeroItensLista(quantidade) {
        const span = document.querySelector('#quantidadeDeItens');
        span.innerHTML = quantidade ;
       
    }

    //verifica se os Dados estão corretos;
    verificarDados(produto) {
        let msg = ''
        if (produto.nomeProduto == '') msg += 'nome invalido ';
        if (produto.preco == "R$ "|| produto.preco == ' '|| produto.preco.length >= 13) msg += 'preço invalido '

        if (msg != '') {
            alert(msg)
            return false;
        }
        return true;
    }

}

var produto = new Produtos();









