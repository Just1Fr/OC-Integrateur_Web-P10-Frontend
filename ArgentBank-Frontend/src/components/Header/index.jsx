import "./index.css"
import { NavLink, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faSignOut } from '@fortawesome/free-solid-svg-icons'

function Header() {

    const logged = useLocation().pathname === "/User"

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src="/src/assets/argentBankLogo.png" alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {
                    logged ?
                    <NavLink className="main-nav-item" to="/User">
                        <FontAwesomeIcon icon={faCircleUser} />
                        Tony
                    </NavLink>
                    : null
                }
                <NavLink className="main-nav-item" to={logged ? "/" : "/sign-in"}>
                    <FontAwesomeIcon icon={logged ? faSignOut : faCircleUser} />
                    {logged ? "Sign Out" : "Sign In"}
                </NavLink>
            </div>
        </nav>
    )
}

export default Header