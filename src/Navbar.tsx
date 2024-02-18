import './styles.css'

function Navbar() {

  return (
    <nav  className='nav'>
        <ul>
            <li className="active">
                <a href="/main">Main</a>
            </li>
            <li>
                <a href="/products">Products</a>
            </li>
            <li>
                <a href="/profile">Profile</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
