import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
    const avtarurl = useSelector((state) => state.avatar);

    const defaultAvatar =
        "https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180";

    return (
        <nav className="navbar bg-dark navbar-dark py-3">
            <div className="container d-flex align-items-center justify-content-between">

                {/* Brand */}
                <Link to="/" className="navbar-brand fw-bold fs-4">
                    MyApp
                </Link>

                {/* Links */}
                <div className="d-flex align-items-center gap-3">

                    <Link className="nav-link text-white px-3 py-1 rounded hover-bg" to="/">
                        Home
                    </Link>

                    <Link className="nav-link text-white px-3 py-1 rounded" to="/login">
                        Login
                    </Link>

                    <Link className="btn btn-outline-info btn-sm" to="/register">
                        Register
                    </Link>

                    <Link className="btn btn-info btn-sm text-dark" to="/todo">
                        Todo
                    </Link>

                    <img
                        src={avtarurl && avtarurl.length > 0 ? avtarurl : defaultAvatar}
                        alt="profile"
                        width="40"
                        height="40"
                        className="rounded-circle border border-secondary"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>
        </nav>
    );
}
