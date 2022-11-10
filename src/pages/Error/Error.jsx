import './error.css'

import { Link } from 'react-router-dom'
import { Logo } from '../../components/Logo/Logo'

export default function Error() {
  return (
    <div className="error">
      <Logo />
      <h1>Página não encontrada</h1>
      <p>A página que está procurando não existe.</p>
      <Link className="link" to="/">
        Voltar para Home
      </Link>
    </div>
  )
}