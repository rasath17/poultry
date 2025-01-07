import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditableTableWithSearch = () => {
    // Fake data with 15 rows and days
    const initialData = Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: 20 + (index % 10),
        email: `user${index + 1}@example.com`,
        day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][
        index % 5
            ], // Random day
    }));

    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: "", age: "", email: "", day: "" });

    // Filtered data based on search
    const filteredData = data.filter((row) =>
        row.day.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    // Modal Handlers
    const handleEdit = (row) => {
        setFormData(row);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setData(
            data.map((item) => (item.id === formData.id ? { ...item, ...formData } : item))
        );
        setShowModal(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Editable Table with Search by Days</h3>

            {/* Search Input */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by day (e.g., Monday)"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Day</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.email}</td>
                                <td>{row.day}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(row)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No results found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Row</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="day" className="form-label">
                                            Day
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="day"
                                            name="day"
                                            value={formData.day}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditableTableWithSearch;
