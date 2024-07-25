import { useState } from "react";
import "../src/globals.css";

export default function App() {
const [listaProdutos, setProdutos] = useState([
    {
    id: 1,
    item: "Hambúrguer",
    imagem: "https://www.assai.com.br/sites/default/files/shutterstock_1806472312.jpg",
    preco: "R$ 25,99"
    },
    {
    id: 2,
    item: "Coca-cola 350ml",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4S15squn95k7qtrVOpMX1MOJGe48y4B7FQ&s",
    preco: "R$ 5,99"
    },
    {
    id: 3,
    item: "Batatas fritas",
    imagem: "https://gastronomiacarioca.zonasul.com.br/wp-content/uploads/2023/05/batata_frita_destaque_ilustrativo_zona_sul.jpg",
    preco: "R$ 8,99"
    },
    {
    id: 4,
    item: "Suco de Frutas",
    imagem: "https://helenalunardelli.com.br/wp-content/uploads/2013/02/sucos.jpg",
    preco: "R$ 8,99"
    },
    {
    id: 5,
    item: "Cachorro-Quente",
    imagem: "https://st3.depositphotos.com/10378406/13512/i/450/depositphotos_135128308-stock-photo-colorful-hot-dog-illustration-isolated.jpg",
    preco: "R$ 7,99"
    },
    {
    id: 6,
    item: "Guaraná Antarctica 350ml",
    imagem: "https://cdn.awsli.com.br/2610/2610989/produto/233533781/guarana-antarctica-lata-original-350ml-j4msuy0uu6.png",
    preco: "R$ 4,99"
    }
]);

const [ListaPedidos, setListaPedidos] = useState([])
const adicionarProduto = (produto) => {
    setListaPedidos([...ListaPedidos, produto]);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Pedido adicionado!",
        showConfirmButton: false,
        timer: 1100
      });
}
const remover = (id) => {
    const novaLista = ListaPedidos.filter(
        (pedidos, index) => {
            if (index !== id) {
                return pedidos
            } else {
                return null;
            }
        }
    )
    Swal.fire({
        icon: "warning",
        title: "Tem certeza que quer remover o pedido?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Cancelar",
        denyButtonText: `Remover`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Ação Cancelada!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Pedido Removido!", "", "success");
            setListaPedidos(novaLista);
        }
    });
}
    return (
       <div className="bloco-principal">
            <div className="bloco-produtos">
            {listaProdutos.map((produto)=>
                <div key={produto.id}>
                    <img src={produto.imagem}></img>
                    <p>{produto.item}</p>
                    <p>{produto.preco}</p>
                    <button onClick={() => adicionarProduto(produto)} ><ion-icon name="add-circle-outline"></ion-icon> Comprar</button>
                </div>
                )
            }
            </div>
            <div className="bloco-pedidos">
    <p>Meus Pedidos</p>
    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Preço</th>
            </tr>
        </thead>
        <tbody>
            {
            ListaPedidos.map((produto, index) =>
                <tr key={produto.id}>
                    <td>{produto.item}</td>
                    <td>{produto.preco}</td>
                    <td><button onClick={() => remover(index)}><ion-icon name="close-circle-outline"></ion-icon></button></td>
                </tr>
            )
        }
            </tbody>
        </table>
    </div>
</div>
    );
}