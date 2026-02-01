import React, { useEffect, useState } from "react";
import Todoitem from "./Todoitem";
import { createcollection, deletecollection } from "../../api/todo";
import { useSelector, useDispatch } from "react-redux";
import { refreshpage } from "../../feture/todo/todoSliece";
import { getUsers } from "../../api/user";
export default function Todo() {

    const [collection, setCollection] = useState([]);
    const [newcollection, setNewcollection] = useState("");

    const rfresh = useSelector((state) => state.refresh);
    const dispatch = useDispatch();

    const fetchCollections = async () => {
        const response = await getUsers();
        setCollection(response.data.data[0].collections);
    };

    const handleNewCollection = async (e) => {
        e.preventDefault();
        if (!newcollection.trim()) return;

        await createcollection({ collection: newcollection });
        setNewcollection("");
        dispatch(refreshpage(!rfresh));
    };

    const handledeletecollection = async (id) => {
        if (!window.confirm("Delete this collection and all its todos?")) return;

        await deletecollection({ collectionid: id });
        dispatch(refreshpage(!rfresh));
    };

    useEffect(() => {
        fetchCollections();
    }, [rfresh]);

    return (
        <div className="container my-5">

            {/* Page Title */}
            <h2 className="mb-4 text-center fw-bold">
                📋 Todo Collections
            </h2>

            {/* Create Collection */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <form onSubmit={handleNewCollection}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="New collection name..."
                                value={newcollection}
                                onChange={(e) => setNewcollection(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit">
                                ➕ Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Collection List */}
            {collection.length === 0 ? (
                <div className="alert alert-info text-center">
                    No collections available
                </div>
            ) : (
                collection.map((col) => (
                    <div key={col._id} className="card shadow-sm mb-4">

                        {/* Card Header */}
                        <div className="card-header d-flex justify-content-between align-items-center">

                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handledeletecollection(col._id)}
                            >
                                🗑 Delete
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                            <Todoitem
                                todos={col.todos}
                                title={col.title}
                                fetchcollection={fetchCollections}
                            />
                        </div>

                    </div>
                ))
            )}
        </div>
    );
}
