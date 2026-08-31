import Logo from './Logo'

function Header() {

    return (
        <header className='header'>
            <Logo 
            color='blue'
            size={100}
            />
            <h1 className='header.title'>Catálogo de Produtos</h1>
            <p className='hader.text'>Casas Corrente Piauí</p>
        </header>
    )
}

export default Header
