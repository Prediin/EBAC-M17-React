import { useEffect, useState } from 'react'
import Logo from './Logo';

function Header() {
    const [compacto, setCompacto] = useState(false)

    useEffect(() => {
        function verificarRolagem() {
            setCompacto(window.scrollY > 40)
        }

        verificarRolagem()
        window.addEventListener('scroll', verificarRolagem, { passive: true })

        return () => window.removeEventListener('scroll', verificarRolagem)
    }, [])

    return (
        <header className={`header ${compacto ? 'header--compacto' : ''}`}>
            <Logo 
            size={150}
            className='logo'
            />
            <div className='text-box'>
                <h1 className='title'>Catálogo de Produtos</h1>
                <p className='text'>Casas São Pedro</p>
            </div>
        </header>
    )
}

export default Header
