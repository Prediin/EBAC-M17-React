import { useRef, useState } from 'react'

const TAMANHO_MAXIMO_IMAGEM = 5 * 1024 * 1024

function Form({ onAdicionar }) {
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [imagem, setImagem] = useState('')
    const [nomeArquivo, setNomeArquivo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [erroImagem, setErroImagem] = useState('')
    const inputArquivo = useRef(null)

    function selecionarImagem(e) {
        const arquivo = e.target.files[0]

        if (!arquivo) {
            setImagem('')
            setNomeArquivo('')
            return
        }

        if (!arquivo.type.startsWith('image/')) {
            setErroImagem('Selecione um arquivo de imagem válido.')
            setImagem('')
            setNomeArquivo('')
            e.target.value = ''
            return
        }

        if (arquivo.size > TAMANHO_MAXIMO_IMAGEM) {
            setErroImagem('A imagem deve ter no máximo 5 MB.')
            setImagem('')
            setNomeArquivo('')
            e.target.value = ''
            return
        }

        const leitor = new FileReader()

        leitor.onload = () => {
            setImagem(leitor.result)
            setNomeArquivo(arquivo.name)
            setErroImagem('')
        }

        leitor.onerror = () => {
            setErroImagem('Não foi possível carregar a imagem.')
            setImagem('')
            setNomeArquivo('')
        }

        leitor.readAsDataURL(arquivo)
    }

    function cadastrarProduto(e) {
        e.preventDefault()

        if (!imagem) {
            setErroImagem('Adicione uma imagem do produto.')
            return
        }

        onAdicionar({
            id: crypto.randomUUID(),
            nome,
            preco: Number(preco),
            img: imagem,
            desc: descricao,
        })

        setNome('')
        setPreco('')
        setImagem('')
        setNomeArquivo('')
        setDescricao('')
        setErroImagem('')

        if (inputArquivo.current) {
            inputArquivo.current.value = ''
        }
    }

    return (
        <form className="form-produto" onSubmit={cadastrarProduto}>
            <div className="form-cabecalho">
                <span className="form-etiqueta">Novo item</span>
                <h2 className="titulo">Cadastrar produto</h2>
                <p>Preencha as informações abaixo para incluir um novo produto no catálogo.</p>
            </div>

            <div className="form-grid">
                <div className="campo">
                    <label htmlFor="nome">Nome do produto</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex.: Sofá de dois lugares"
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="preco">Preço</label>
                    <div className="campo-preco">
                        <span>R$</span>
                        <input
                            id="preco"
                            type="number"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            placeholder="499,90"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                <div className="campo campo--descricao">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Conte os principais detalhes do produto"
                        rows="5"
                        required
                    />
                </div>

                <div className="campo campo--imagem">
                    <label htmlFor="imagem">Imagem do produto</label>
                    <div className="upload-imagem">
                        {imagem ? (
                            <img src={imagem} alt="Pré-visualização do produto" />
                        ) : (
                            <div className="upload-placeholder" aria-hidden="true">
                                <span className="upload-icone">+</span>
                                <strong>Escolha uma imagem</strong>
                                <small>PNG, JPG ou WEBP de até 5 MB</small>
                            </div>
                        )}

                        <input
                            ref={inputArquivo}
                            id="imagem"
                            className="input-arquivo"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={selecionarImagem}
                            required
                        />
                    </div>

                    {nomeArquivo && <span className="nome-arquivo">{nomeArquivo}</span>}
                    {erroImagem && <span className="erro-imagem" role="alert">{erroImagem}</span>}
                </div>
            </div>

            <div className="form-acoes">
                <span>O produto será exibido logo abaixo.</span>
                <button type="submit" className="btnAdicionar">Adicionar ao catálogo</button>
            </div>
        </form>
    )
}

export default Form
