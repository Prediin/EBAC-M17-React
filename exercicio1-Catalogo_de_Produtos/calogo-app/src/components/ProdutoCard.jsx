
function Formatador({ valor }) {
    const numeroFormatado = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);

    return <span>{numeroFormatado}</span>;
}

function ProdutoCard({nome, preco, img, desc}) {
    
    return (
        <div className="prod-card">
            <img src={img}
            alt="Produto"
            className="img"/>
            <p className="nome">{nome}</p>
            <p className="preco">R$ <Formatador valor={preco} /></p>
            <p className="desc">{desc}</p>
        </div>
    )
}

export default ProdutoCard