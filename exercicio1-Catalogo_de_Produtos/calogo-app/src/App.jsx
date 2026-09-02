import { useState } from 'react'
import './styles/global.scss'
import produtosIniciais from './data/produtos.json'
import Header from './components/Header.jsx'
import Form from './components/Form.jsx'
import ProdutoCard from './components/ProdutoCard.jsx'

const CHAVE_LOCAL_STORAGE = 'catalogo-produtos'

function carregarProdutos() {
  try {
    const produtosSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE)

    if (produtosSalvos) {
      const produtosConvertidos = JSON.parse(produtosSalvos)

      if (Array.isArray(produtosConvertidos)) {
        return produtosConvertidos
      }
    }
  } catch (erro) {
    console.error('Não foi possível carregar os produtos salvos.', erro)
  }

  return produtosIniciais
}

function App() {
  const [produtos, setProdutos] = useState(carregarProdutos)
  const [erroArmazenamento, setErroArmazenamento] = useState('')

  function adicionarProduto(novoProduto) {
    const produtosAtualizados = [...produtos, novoProduto]

    try {
      localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(produtosAtualizados))
      setErroArmazenamento('')
    } catch (erro) {
      console.error('Não foi possível salvar os produtos.', erro)
      setErroArmazenamento(
        'O armazenamento do navegador está cheio. Tente usar imagens menores.',
      )
    }

    setProdutos(produtosAtualizados)
  }

  return (
    <>
      <Header />
      <main>
        <Form onAdicionar={adicionarProduto} />

        <section className="catalogo" aria-labelledby="titulo-catalogo">
          <div className="catalogo-cabecalho">
            <div>
              <span className="catalogo-etiqueta">Catálogo salvo</span>
              <h2 id="titulo-catalogo">Produtos</h2>
              <p>{produtos.length} {produtos.length === 1 ? 'produto cadastrado' : 'produtos cadastrados'}</p>
            </div>

          </div>

          {erroArmazenamento && (
            <p className="erro-armazenamento" role="alert">{erroArmazenamento}</p>
          )}

          <div className="produtos">
            {produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                img={produto.img}
                desc={produto.desc}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
