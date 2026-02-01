import axios from "axios";
import { useState } from "react";
import { loginUser } from "../../api/user";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });

            console.log("Login response:", response.data);
        } catch (error) {
            console.error(
                "Login error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={submit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
