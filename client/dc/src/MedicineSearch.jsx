

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MedicineSearch.css";
import { useNavigate } from "react-router-dom";

function MedicineSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        let x = confirm("Do you want to logout?");
        if (x) {
            navigate("/");
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchMedicines(value);
    };

    const fetchMedicines = (query = "") => {
        axios.get(`http://localhost:4000/medicines/search?q=${query}`)
            .then(response => setFilteredMedicines(response.data))
            .catch(error => console.error("Error fetching medicines:", error));
    };

    useEffect(() => {
        fetchMedicines(); // Initial fetch
    }, []);

    return (
        <>
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
            <div className="medicine-search-container">
                <h1>Medicine Search</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for medicines..."
                    className="search-input"
                />
                <ul className="medicine-list">
                    {filteredMedicines.map((medicine) => (
                        <li key={medicine._id} className="medicine-item">
                            <h3>{medicine.name}</h3>
                            <p>{medicine.description}</p>
                        </li>
                    ))}
                    {filteredMedicines.length === 0 && (
                        <li className="no-results">No medicines found.</li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default MedicineSearch;
