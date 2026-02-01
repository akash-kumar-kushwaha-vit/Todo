import { useState } from "react";
import axios from "axios";
import api from "../../api/api";
import { createUser } from "../../api/user";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState(null);

    // text input handler
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // file handler
    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("avtar", avatar);

        try {
            const response = await createUser(formData);
            console.log("Registration response:", response.data);
            alert("User registered");
        } catch (err) {
            console.error(err);
            alert("Error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4"
        >
            <h2 className="text-xl font-bold text-center">Register</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
            />

            <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleFileChange}
                required
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Register
            </button>
        </form>
    );
}
