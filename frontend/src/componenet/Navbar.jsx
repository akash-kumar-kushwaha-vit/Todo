import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-2xl font-extrabold tracking-wide bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    MyApp
                </h1>

                {/* Links */}
                <div className="flex items-center space-x-8 text-sm font-medium">

                    <Link
                        to="/"
                        className="relative hover:text-blue-400 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full"
                    >
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Register
                    </Link>

                    <Link
                        to="/todo"
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
                    >
                        todo
                    </Link>

                </div>
            </div>
        </nav>
    );
}
