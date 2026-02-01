import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateAvtar } from "../api/user";
import { refreshpage } from "../feture/todo/todoSliece";

export default function Navbar() {
    const avtarurl = useSelector((state) => state.avatar);
    const refresh = useSelector((state) => state.refresh);
    const [isprofile, setIsprofile] = useState(false);
    const [avtar, setavtar] = useState(null);
    const dispatch = useDispatch();

    const defaultAvatar =
        "https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180";

    const handleFileChange = (e) => {
        setavtar(e.target.files[0]);
    };

    const handleupdatepic = async () => {
        if (!avtar) return alert("Please select an image");

        const formData = new FormData();
        formData.append("avtar", avtar);

        await updateAvtar(formData);

        setavtar(null);
        setIsprofile(false);
        dispatch(refreshpage(!refresh));
    };

    return (
        <nav className="navbar bg-dark navbar-dark py-3">
            <div className="container d-flex align-items-center justify-content-between">

                <Link to="/" className="navbar-brand fw-bold fs-4">
                    MyApp
                </Link>

                <div className="d-flex align-items-center gap-3">

                    <Link className="nav-link text-white" to="/">Home</Link>
                    <Link className="nav-link text-white" to="/login">Login</Link>
                    <Link className="btn btn-outline-info btn-sm" to="/register">Register</Link>
                    <Link className="btn btn-info btn-sm text-dark" to="/todo">Todo</Link>

                    {/* Avatar Section */}
                    <div className="position-relative">

                        <img
                            src={avtarurl || defaultAvatar}
                            alt="profile"
                            width="42"
                            height="42"
                            className="rounded-circle border border-secondary"
                            style={{ objectFit: "cover", cursor: "pointer" }}
                            onClick={() => setIsprofile(!isprofile)}
                        />

                        {isprofile && (
                            <div
                                className="position-absolute end-0 mt-2 p-3 bg-dark border rounded shadow"
                                style={{ width: "220px", zIndex: 1000 }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control form-control-sm"
                                    onChange={handleFileChange}
                                />

                                <button
                                    className="btn btn-sm btn-success w-100 mt-2"
                                    onClick={handleupdatepic}
                                >
                                    Update Profile
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-light w-100 mt-1"
                                    onClick={() => setIsprofile(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
