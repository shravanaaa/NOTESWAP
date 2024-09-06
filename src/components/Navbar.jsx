import { Link } from "react-router-dom";

const Navbar = ({ isAuth, signUserOut }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          NoteSwap
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            {!isAuth ? (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/createpost" className="nav-link">
                    Create Post
                  </Link>
                </li>
                <button
                  className="btn btn-danger"
                  onClick={signUserOut}
                >
                  Logout
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

