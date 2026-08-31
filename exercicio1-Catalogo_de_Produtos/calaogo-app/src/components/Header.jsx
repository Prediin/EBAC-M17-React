import Logo from './Logo'

function Header() {

    return (
        <header className='header'>
            <Logo 
            size={150}
            className='logo'
            />
            <h1 className='title'>Catálogo de Produtos</h1>
            <p className='text'>Casas São Pedro</p>
        </header>
    )
}

export default Header
