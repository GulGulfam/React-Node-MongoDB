
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Report.css'

const Report = () => {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
        name: "",
        disease: "",
        level: "",
        symptomsDate: "",
    });
    const [editReport, setEditReport] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/reports")
            .then(response => setReports(response.data))
            .catch(error => console.error("Error fetching reports:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReport({
            ...newReport,
            [name]: value,
        });
    };

    const handleAddReport = () => {
        if (!newReport.name || !newReport.disease || !newReport.level || !newReport.symptomsDate) {
            alert("Please fill out all fields.");
            return;
        }
        axios.post("http://localhost:4000/reports", newReport)
            .then(response => {
                setReports([...reports, response.data]);
                setNewReport({
                    name: "",
                    disease: "",
                    level: "",
                    symptomsDate: "",
                });
            })
            .catch(error => console.error("Error adding report:", error));
    };

    const handleDeleteReport = (id) => {
        axios.delete(`http://localhost:4000/reports/${id}`)
            .then(() => {
                setReports(reports.filter(report => report._id !== id));
            })
            .catch(error => console.error("Error deleting report:", error));
    };

    const handleEditReport = (report) => {
        setEditReport(report);
    };

    const handleUpdateReport = () => {
        axios.put(`http://localhost:4000/reports/${editReport._id}`, editReport)
            .then(response => {
                setReports(reports.map(report => report._id === response.data._id ? response.data : report));
                setEditReport(null);
            })
            .catch(error => console.error("Error updating report:", error));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditReport({
            ...editReport,
            [name]: value,
        });
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        let x = confirm("Do you want to logout?");
        if (x) {
            navigate("/");
        }
    };

    return (
        <>
            <div className="dashboard">
                <header>
                    <nav>
                        <ul className="nav-lists">
                            <li>
                                <button onClick={() => handleNavigation("/dashboard")}>Dashboard</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation("/report")}>Reports</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation("/profile")}>Profile</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation("/medicine-search")}>Medicine Search</button>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                        <div className="search-container">
                            <input type="text" placeholder="Search..." />
                        </div>
                    </nav>
                </header>
                <div className="Patient">
                    <main>
                        <h1>Report Management</h1>
                        <div className="form-container">
                            <div className="add-report-form">
                                <h2>Make New Report</h2>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newReport.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="disease"
                                    placeholder="Disease"
                                    value={newReport.disease}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="level"
                                    placeholder="Level"
                                    value={newReport.level}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    name="symptomsDate"
                                    placeholder="Symptoms Date"
                                    value={newReport.symptomsDate}
                                    onChange={handleInputChange}
                                    className="da"
                                />
                                <button className="bt" onClick={handleAddReport}>Make Report</button>
                            </div>

                            {editReport && (
                                <div className="edit-report-form">
                                    <h2>Edit Report</h2>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={editReport.name}
                                        onChange={handleEditInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="disease"
                                        placeholder="Disease"
                                        value={editReport.disease}
                                        onChange={handleEditInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="level"
                                        placeholder="Level"
                                        value={editReport.level}
                                        onChange={handleEditInputChange}
                                    />
                                    <input
                                        type="date"
                                        name="symptomsDate"
                                        placeholder="Symptoms Date"
                                        value={editReport.symptomsDate}
                                        onChange={handleEditInputChange}
                                    />
                                    <button className="bt" onClick={handleUpdateReport}>Update Report</button>
                                </div>
                            )}
                        </div>

                        <div className="report-list">
                            <h2>Reports List</h2>
                            <ul>
                                {reports.map((report) => (
                                    <li key={report._id}>
                                        <hr />
                                        <div>Name: {report.name}</div>
                                        <div>Disease: {report.disease}</div>
                                        <div>Level: {report.level}</div>
                                        <div>Symptoms Date: {new Date(report.symptomsDate).toLocaleDateString()}</div>
                                        <button className="bt" onClick={() => handleEditReport(report)}>Edit</button>
                                        <button  className="bt" onClick={() => handleDeleteReport(report._id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Report;

