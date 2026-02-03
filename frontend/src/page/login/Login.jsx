
import { useState } from "react";
import { loginUser } from "../../api/user";
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addAvtar, refreshpage } from '../../feture/todo/todoSliece';
import { fetchUser } from '../../feture/globalapi/getuser';
import { useSelector } from "react-redux";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const rfresh = useSelector((state) => state.refresh);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });
            dispatch(refreshpage(!rfresh))
            console.log("Login response:", response.data);
        } catch (error) {
            console.error(
                "Login error:",
                error.response?.data || error.message
            );
        }

    };


    useEffect(() => {
        fetchUser().then((res) => {
            dispatch(addAvtar(res.data.data[0].avtar))
        }).catch((error) => {
            console.log("error", error);

        })
    }, [rfresh])



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
