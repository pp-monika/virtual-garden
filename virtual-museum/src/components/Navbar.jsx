import logo from "../assets/logo.png";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src={logo} alt="Logo" width="60px" height="60px" className="d-inline-block align-text-top" />
                </a>

                {/* Navbar Toggler for Mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Collections
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">State Collections</a></li>
                                <li><a className="dropdown-item" href="#">Seasonal Collections</a></li>
                                <li><a className="dropdown-item" href="#">Historical Collections</a></li>
                                <li><a className="dropdown-item" href="#">Endangered Collections</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About Us</a>
                        </li>
                    </ul>

                    {/* User Profile Icon - Positioned on the Right */}
                    <a href="/profile" className="nav-link text-dark ms-auto">
                        <i className="bi bi-person-circle" style={{ fontSize: "2rem" }}></i>
                    </a>
                </div>
            </div>
        </nav>
    );
}