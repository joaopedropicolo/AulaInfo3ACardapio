import { useState, useEffect } from "react";
import "../src/globals.css";

export default function App() {
const [totalPreco, setTotalPreco] = useState(0);
const [listaProdutos, setProdutos] = useState([
    {
    id: 1,
    item: "Hambúrguer",
    imagem: "https://www.assai.com.br/sites/default/files/shutterstock_1806472312.jpg",
    preco: 25
    },
    {
    id: 2,
    item: "Coca-cola 350ml",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4S15squn95k7qtrVOpMX1MOJGe48y4B7FQ&s",
    preco: 5
    },
    {
    id: 3,
    item: "Batatas fritas",
    imagem: "https://gastronomiacarioca.zonasul.com.br/wp-content/uploads/2023/05/batata_frita_destaque_ilustrativo_zona_sul.jpg",
    preco: 8
    },
    {
    id: 4,
    item: "Suco de Frutas",
    imagem: "https://helenalunardelli.com.br/wp-content/uploads/2013/02/sucos.jpg",
    preco: 8
    },
    {
    id: 5,
    item: "Cachorro-Quente",
    imagem: "https://st3.depositphotos.com/10378406/13512/i/450/depositphotos_135128308-stock-photo-colorful-hot-dog-illustration-isolated.jpg",
    preco: 7
    },
    {
    id: 6,
    item: "Guaraná Antarctica 350ml",
    imagem: "https://d1zvfmhlebc91g.cloudfront.net/fit-in/330x330/filters:fill(ffffff)/filters:background_color(ffffff)/filters:quality(70)/n49shopv2_papelecia/images/products/648b6d3edda69/refrigerante_guarana_antarctica_350ml_1-648b6d3f2d429.jpg",
    preco: 4
    }
]);

const SomaPreco = () => {
    let SomaTotal = ListaPedidos.reduce((total, produto) => total + produto.preco, 0);
    document.getElementById("ValorTotal").innerHTML = "Lista De Pedidos" + "<br> <br>" + "Valor Total: R$" + SomaTotal + ",00";
    setTotalPreco(SomaTotal);
  };
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
      SomaPreco();
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
            SomaPreco();
            console.log("Produto removido.")
        }
    });
}
const finalizarCompra = () => {
    if (ListaPedidos.length == 0) {
      Swal.fire({
        icon: "error",
        title: "A lista está vazia!",
        html: "Não vendemos vento aqui!",
        timer: 3700,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Tem certeza que quer finalizar o pedido?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Finalizar pedido",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Pedido realizado!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  setListaPedidos([])
                  SomaPreco();
            } else if (result.isDenied) {
                Swal.fire("Ação cacelada!", "", "success");
                setListaPedidos(novaLista);
                SomaPreco();
            }
        });
    }
  };

useEffect(() => {
    SomaPreco();
  }, [ListaPedidos]);

    return (
       <div className="bloco-principal">
            <div className="bloco-produtos">
            {listaProdutos.map((produto)=>
                <div key={produto.id}>
                    <img src={produto.imagem}></img>
                    <p>{produto.item}</p>
                    <p>R$ {produto.preco},00</p>
                    <button onClick={() => adicionarProduto(produto)} ><ion-icon name="add-circle-outline"></ion-icon> Comprar</button>
                </div>
                )
            }
            </div>
            <div className="bloco-pedidos">
    <p id="ValorTotal"></p>
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
                    <td>R$ {produto.preco},00</td>
                    <td><button onClick={() => remover(index)}><ion-icon name="close-circle-outline"></ion-icon></button></td>
                </tr>
                
            )
        }
            </tbody>
        </table>
        <button onClick={finalizarCompra}>Finalizar Pedido</button>
    </div>
</div>
    );
}