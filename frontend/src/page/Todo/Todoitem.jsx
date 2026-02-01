import React, { useState } from "react";
import { addtast, changeStatus, deletetodo } from "../../api/todo";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { refreshpage } from "../../feture/todo/todoSliece";


export default function Todoitem({ title, todos, fetchcollection }) {
    const [open, setOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const rfresh = useSelector((state) => state.refresh);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskTitle || !description) return alert("Fill all fields");

        await addtast({ title: taskTitle, discription: description }, title);
        setTaskTitle("");
        setDescription("");
        dispatch(refreshpage(!rfresh))
    };

    const handlestatus = async (id) => {
        await changeStatus({ todoid: id });
        dispatch(refreshpage(!rfresh))
    };

    const handledeletetodo = async (id, collectionname) => {
        await deletetodo({ todoid: id, collectionname: collectionname })
        dispatch(refreshpage(!rfresh))
    }

    useEffect(() => {
        fetchcollection();
    }, [rfresh])


    return (
        <div className="container my-4">

            {/* Collection Header */}
            <div
                className="card shadow-sm border-0 hover-shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
            >
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h5 className="fw-semibold mb-0">{title}</h5>
                    <span className="badge rounded-pill bg-dark px-3">
                        {todos.length}
                    </span>
                </div>
            </div>

            {open && (
                <div className="mt-4">

                    {/* Add Todo */}
                    <form
                        onSubmit={handleAddTask}
                        className="card border-0 shadow-sm p-3 mb-4"
                    >
                        <h6 className="fw-semibold mb-3">➕ Add New Todo</h6>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Todo title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Todo description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className="btn btn-primary btn-sm w-100">
                            Add Todo
                        </button>
                    </form>

                    {/* Todo Items */}
                    {todos.map((t) => (
                        <div
                            key={t._id}
                            className="card border-0 shadow-sm mb-3"
                        >
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 className="mb-1 fw-semibold">
                                        {t.title}
                                    </h6>
                                    <p className="text-muted small mb-2">
                                        {t.discription}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handlestatus(t._id)}
                                    className={`btn btn-sm rounded-pill px-3 ${t.status
                                        ? "btn-success"
                                        : "btn-warning text-dark"
                                        }`}
                                >
                                    {t.status ? "Completed" : "Pending"}
                                </button>

                                {/* delete todo */}
                                <button
                                    onClick={() => handledeletetodo(t._id, title)}
                                    className="btn  btn-danger btn-sm w-30"
                                >
                                    delete
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
