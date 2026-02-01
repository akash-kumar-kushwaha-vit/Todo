import React, { useState, useEffect } from "react";
import { addtast, changeStatus, deletetodo, updateTask } from "../../api/todo";
import { useSelector, useDispatch } from "react-redux";
import { refreshpage } from "../../feture/todo/todoSliece";


export default function Todoitem({ title, todos, fetchcollection }) {

    const [open, setOpen] = useState(false);

    // add todo
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");

    // edit todo
    const [editId, setEditId] = useState(null);

    const dispatch = useDispatch();
    const rfresh = useSelector((state) => state.refresh);

    // ---------------- ADD TODO ----------------
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskTitle || !description) {
            alert("Fill all fields");
            return;
        }

        await addtast(
            { title: taskTitle, discription: description },
            title
        );

        setTaskTitle("");
        setDescription("");
        dispatch(refreshpage(!rfresh));
    };

    // ---------------- TOGGLE STATUS ----------------
    const handlestatus = async (id) => {
        await changeStatus({ todoid: id });
        dispatch(refreshpage(!rfresh));
    };

    // ---------------- DELETE TODO ----------------
    const handledeletetodo = async (id, collectionname) => {
        if (!window.confirm("Delete this todo?")) return;

        await deletetodo({
            todoid: id,
            collectionname
        });

        dispatch(refreshpage(!rfresh));
    };

    // ---------------- START EDIT ----------------
    const startEdit = (todo) => {
        setEditId(todo._id);
        setTaskTitle(todo.title);
        setDescription(todo.discription);
    };

    // ---------------- SAVE UPDATE ----------------
    const handleUpadatetodo = async (e, id) => {
        e.preventDefault();

        await updateTask({
            todoid: id,
            title: taskTitle,
            discription: description
        });

        setEditId(null);
        setTaskTitle("");
        setDescription("");
        dispatch(refreshpage(!rfresh));
    };

    // refresh collection
    useEffect(() => {
        fetchcollection();
    }, [rfresh]);

    return (
        <div className="container my-4">

            {/* Collection Header */}
            <div
                className="card shadow-sm border-0"
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

                    {/* Todo List */}
                    {todos.map((t) => (
                        <div
                            key={t._id}
                            className="card border-0 shadow-sm mb-3"
                        >
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="fw-semibold mb-1">
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
                                </div>

                                {/* Edit / Actions */}
                                <div className="mt-2 d-flex gap-2">
                                    {editId === t._id ? (
                                        <form
                                            onSubmit={(e) =>
                                                handleUpadatetodo(e, t._id)
                                            }
                                            className="w-100"
                                        >
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                value={taskTitle}
                                                onChange={(e) =>
                                                    setTaskTitle(e.target.value)
                                                }
                                            />

                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(e.target.value)
                                                }
                                            />

                                            <div className="d-flex gap-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() =>
                                                        setEditId(null)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEdit(t)}
                                                className="btn btn-outline-success btn-sm"
                                            >
                                                Update
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handledeletetodo(t._id, title)
                                                }
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
