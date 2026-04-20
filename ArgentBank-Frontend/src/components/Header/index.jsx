import './index.css'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faSignOut } from '@fortawesome/free-solid-svg-icons'

export default function Header() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const userName = useSelector((state) => state.auth.userName)

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src="/src/assets/argentBankLogo.png" alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {
                    userName ?
                    <NavLink className="main-nav-item" to="/user">
                        <FontAwesomeIcon icon={faCircleUser} />
                        {userName ? userName : "Unknown"}
                    </NavLink>
                    : null
                }
                <NavLink className="main-nav-item" to={userName ? "/" : "/sign-in"} onClick={userName ? handleLogout : null}>
                    <FontAwesomeIcon icon={userName ? faSignOut : faCircleUser} />
                    {userName ? "Sign Out" : "Sign In"}
                </NavLink>
            </div>
        </nav>
    )
}