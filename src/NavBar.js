import { Link } from 'react-router-dom';

const NavBar = () => {
    return (  
        <nav className="navbar">
            <Link className="home-button" to="/">Chess.io</Link>
            <div className="buttons">
                <Link to="/login">Log In</Link>
                <Link to="/signup" style={{
                    color: "white",
                    backgroundColor: '#c8b7b7',
                    borderRadius: '8px'
                }}>Sign Up</Link>
            </div>
        </nav>
    );
}
 
export default NavBar;